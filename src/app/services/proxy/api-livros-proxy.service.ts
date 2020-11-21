// Dependencies
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// DTOs
import { SignUpResponse } from '../dto/sign-up.response';
import { SignInResponse } from '../dto/sign-in-response';
import { SignUpForm } from '../dto/sign-up-form';
import { SignInForm } from '../dto/sign-in-form';
import { DefaultResponse } from '../dto/default.response';

const BASE_URL = 'http://apitrocalivros.gear.host/api';

@Injectable()
export class ApiLivrosProxyService {
  constructor(private httpClient: HttpClient) {}

  registerNewBook(addBookForm): Observable<DefaultResponse> {
    return this.httpClient.post<DefaultResponse>(
      `${BASE_URL}/cn/livro/criarLivro`,
      addBookForm
    );
  }

  signIn(signInForm: SignInForm): Observable<SignInResponse> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('grant_type', 'password');
    urlSearchParams.set('username', signInForm.username);
    urlSearchParams.set('password', signInForm.password);

    const body = urlSearchParams.toString();

    return this.httpClient.post<SignInResponse>(
      `${BASE_URL}/cn/access/login`,
      body,
      {
        headers,
      }
    );
  }

  // signIn(signInForm: SignInForm): Observable<SignInResponse> {
  //   return this.httpClient.post<SignInResponse>(
  //     `${BASE_URL}/cn/access/login`,
  //     JSON.stringify({...signInForm, grant_type: 'password'})
  //   );
  // }

  signUp(signUpForm: SignUpForm): Observable<SignUpResponse> {
    return this.httpClient.post<SignUpResponse>(
      `${BASE_URL}/cn/criarUsuario`,
      signUpForm
    );
  }
}
