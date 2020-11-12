// Dependencies
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

// Services
import { ApiLivrosProxyService } from '../proxy/api-livros-proxy.service';

// DTOs
import { SignInResponse } from './../dto/sign-in-response';
import { SignInForm } from './../dto/sign-in-form';

@Injectable()
export class SignInService {
  public signInForm: FormGroup;
  public errorMessages = {
    username: [
      {
        type: 'required',
        message: 'Campo obrigatório',
      },
    ],
    password: [
      {
        type: 'required',
        message: 'Campo obrigatório',
      },
    ],
  };

  constructor(
    private apiLivrosProxyService: ApiLivrosProxyService,
    private formBuilder: FormBuilder
  ) {}

  public getErrorMessages(): any {
    return this.errorMessages;
  }

  public getSignInForm(): FormGroup {
    this.signInForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
    return this.signInForm;
  }

  public signIn(signInForm: SignInForm): Observable<SignInResponse> {
    return this.apiLivrosProxyService.signIn(signInForm);
  }
}
