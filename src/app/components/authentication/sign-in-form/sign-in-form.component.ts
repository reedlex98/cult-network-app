import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { catchError, tap, finalize } from 'rxjs/operators';
import { SignInService } from 'src/app/services/base/sign-in.service';
import { SignInForm } from 'src/app/services/dto/sign-in-form';
import { Uf } from 'src/app/services/dto/uf';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnInit {
  public signInForm: FormGroup;
  public errorMessages: any;
  public listUf: Uf[];
  public returnUrl: string;
  public isLoading: boolean;

  constructor(
    private signInService: SignInService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private ngxLoader: NgxUiLoaderService,
    private location: Location
  ) {}

  ngOnInit() {
    this.signInForm = this.signInService.getSignInForm();
    this.errorMessages = this.signInService.getErrorMessages();
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params.returnUrl;
    });
  }

  signIn() {
    this.ngxLoader.start();
    this.signInService
      .signIn(this.signInForm.value)
      .pipe(
        finalize(() => {
          this.ngxLoader.stop();
        })
      )
      .subscribe(
        () => {
          if (this.returnUrl) {
            location.replace(location.origin + this.returnUrl);
            return;
          }
          this.router.navigateByUrl('app/dashboard');
        },
        (err) => {
          this.toastr.show(
            err.error.error_description,
            err.error.error[0].toUpperCase() + err.error.error.slice(1),
            {
              timeOut: 2000,
              positionClass: 'toast-bottom-full-width',
            }
          );
        }
      );
  }
}
