import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize, tap } from 'rxjs/operators';
import { SignUpService } from 'src/app/services/base/sign-up.service';
import { SignUpForm } from 'src/app/services/dto/sign-up-form';
import { Uf } from 'src/app/services/dto/uf';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent implements OnInit {
  public signUpForm: FormGroup;
  public errorMessages: any;
  public listUf: Uf[];
  public userPosition: any;

  constructor(
    private signUpService: SignUpService,
    private ngxLoader: NgxUiLoaderService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.signUpForm = this.signUpService.getSignUpForm();
    this.errorMessages = this.signUpService.getErrorMessages();
    this.listUf = this.signUpService.getListUf();
    this.findMe();
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userPosition = position;
        this.signUpForm.patchValue({
          latitude: this.userPosition.coords.latitude,
          longitude: this.userPosition.coords.longitude,
        });
        this.signUpForm.get('latitude').disable();
        this.signUpForm.get('longitude').disable();
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  signUp() {
    this.ngxLoader.start();
    this.signUpForm.get('latitude').enable();
    this.signUpForm.get('longitude').enable();
    this.signUpService
      .signUp(this.signUpForm.value)
      .pipe(
        finalize(() => {
          this.ngxLoader.stop();
        })
      )
      .subscribe(
        () => {
          this.toastr.show(
            'Prossiga e faça seu login',
            'Cadastro efetuado com sucesso!',
            {
              timeOut: 2000,
              positionClass: 'toast-top-full-width',
            }
          );
          this.signUpForm.get('latitude').disable();
          this.signUpForm.get('longitude').disable();
          this.router.navigateByUrl('auth/sign-in');
        },
        (err) => {
          this.toastr.show(
            err.error.error_description,
            err.error.error[0].toUpperCase() + err.error.error.slice(1),
            {
              timeOut: 2000,
              positionClass: 'toast-top-full-width',
            }
          );
        }
      );
  }
}
