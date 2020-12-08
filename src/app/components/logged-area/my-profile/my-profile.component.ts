import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';
import { MyProfileService } from 'src/app/services/base/my-profile.service';
import { Uf } from 'src/app/services/dto/uf';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  public updateProfileForm: FormGroup;
  public errorMessages: any;
  public listUf: Uf[];
  public userPosition: any;
  public editMode = false;

  constructor(
    private myProfileService: MyProfileService,
    private ngxLoader: NgxUiLoaderService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userPosition = position;
        this.updateProfileForm.patchValue({
          latitude: this.userPosition.coords.latitude,
          longitude: this.userPosition.coords.longitude,
        });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  ngOnInit() {
    this.updateProfileForm = this.myProfileService.getUpdateProfileForm();
    this.getPreviousData();
    this.errorMessages = this.myProfileService.getErrorMessages();
    this.listUf = this.myProfileService.getListUf();
  }

  getPreviousData() {
    this.ngxLoader.start();
    this.myProfileService.getPreviousProfileData().subscribe((res) => {
      this.ngxLoader.stop();
      // this.updateProfileForm = this.myProfileService.patchGetUserResponseValueToForm(
      //   res
      // );
      this.updateProfileForm.disable();
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.updateProfileForm.enable();
    } else {
      this.getPreviousData();
    }
  }

  updateUserData() {
    this.ngxLoader.start();
    this.myProfileService
      .updateUserData(this.updateProfileForm.value)
      .pipe(
        finalize(() => {
          this.ngxLoader.stop();
        })
      )
      .subscribe(
        (res) => {
          if (res.Code !== 200) {
            this.toastr.show(res.Msg, 'Erro ao atualizar perfil!', {
              timeOut: 2000,
            });
          } else {
            this.toastr.show(res.Msg, 'Perfil atualizado com sucesso!', {
              timeOut: 2000,
            });
          }
        },
        (err) => {
          this.toastr.show(
            err.error.error_description,
            err.error.error[0].toUpperCase() + err.error.error.slice(1),
            {
              timeOut: 2000,
            }
          );
        }
      );
  }
}
