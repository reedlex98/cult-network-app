import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, finalize } from 'rxjs/operators';
import { SignInService } from 'src/app/services/base/sign-in.service';
import { SignInForm } from 'src/app/services/dto/sign-in-form';
import { Uf } from 'src/app/services/dto/uf';

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
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.signInForm = this.signInService.getSignInForm();
    this.errorMessages = this.signInService.getErrorMessages();
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params.returnUrl;
    });
  }

  signIn() {
    this.isLoading = true;
    this.signInService
      .signIn(this.signInForm.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        () => {
          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
            return;
          }
          this.router.navigateByUrl('app/dashboard');
        },
        (err) => {
          this.toastr.show(err.error.error_description, err.error.error[0].toUpperCase() + err.error.error.slice(1), {
            timeOut: 2000,
            positionClass: 'toast-bottom-full-width'
          });
        }
      );
  }
}
