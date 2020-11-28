import { TokenResponse } from './../dto/token.response';
// Dependencies
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
import { map } from 'rxjs/operators';

@Injectable()
export class SignInService {
  public static tokenResponseSubject: BehaviorSubject<TokenResponse> = new BehaviorSubject<TokenResponse>(
    JSON.parse(localStorage.getItem('tokenResponse'))
  ) ;

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
  public tokenResponse: Observable<TokenResponse>;


  constructor(
    private apiLivrosProxyService: ApiLivrosProxyService,
    private formBuilder: FormBuilder
  ) {
    //  this.tokenResponseSubject = ;
    this.tokenResponse = SignInService.tokenResponseSubject.asObservable();
  }

  public getErrorMessages(): any {
    return this.errorMessages;
  }

  public get tokenResponseValue(): TokenResponse {
    return SignInService.tokenResponseSubject.value;
  }

  public getSignInForm(): FormGroup {
    this.signInForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
    return this.signInForm;
  }

  public signIn(signInForm: SignInForm): Observable<SignInResponse> {
    return this.apiLivrosProxyService.signIn(signInForm).pipe(
      map((tokenObj) => {
        localStorage.setItem('tokenResponse', JSON.stringify(tokenObj));
        SignInService.tokenResponseSubject.next(tokenObj);
        return tokenObj;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('tokenResponse');

    SignInService.tokenResponseSubject = new BehaviorSubject<TokenResponse>(null);
    this.tokenResponse = SignInService.tokenResponseSubject.asObservable();
  }
}
