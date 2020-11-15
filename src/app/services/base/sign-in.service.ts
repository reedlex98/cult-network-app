import { TokenResponse } from './../dto/token.response';
// Dependencies
import { Injectable } from '@angular/core';
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

  private tokenResponseSubject: BehaviorSubject<TokenResponse>;

  constructor(
    private apiLivrosProxyService: ApiLivrosProxyService,
    private formBuilder: FormBuilder
  ) {
    this.tokenResponseSubject = new BehaviorSubject<TokenResponse>(
      JSON.parse(localStorage.getItem('tokenResponse'))
    );
    this.tokenResponse = this.tokenResponseSubject.asObservable();
  }

  public getErrorMessages(): any {
    return this.errorMessages;
  }

  public get tokenResponseValue(): TokenResponse {
    return this.tokenResponseSubject.value;
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
        this.tokenResponseSubject.next(tokenObj);
        return tokenObj;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('tokenResponse');
    this.tokenResponseSubject.next(null);
  }
}
