// Dependencies
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// DTOs
import { SignUpResponse } from '../dto/sign-up.response';
import { SignInResponse } from '../dto/sign-in-response';
import { SignUpForm } from '../dto/sign-up-form';
import { SignInForm } from '../dto/sign-in-form';

const BASE_URL = "http://apitrocalivros.gear.host/api"

@Injectable()
export class ApiLivrosProxyService {

  constructor(
    private httpClient: HttpClient
  ) { }

  signIn(signInForm: SignInForm): Observable<SignInResponse> {
    return this.httpClient.post<SignInResponse>(
      `${BASE_URL}/cn/access/login`,
      signInForm
    )
  }

  signUp(signUpForm: SignUpForm): Observable<SignUpResponse> {
    return this.httpClient.post<SignUpResponse>(
      `${BASE_URL}/cn/criarUsuario`,
      signUpForm
    )
  }

}
