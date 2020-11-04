// Dependencies
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

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

  jsonToURI(json) { return encodeURIComponent(JSON.stringify(json)); }

  signIn(signInForm: SignInForm): Observable<HttpResponse<SignInResponse>> {
    const body = new HttpParams()
      .set(`username`, signInForm.username)
      .set(`password`, signInForm.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.httpClient.post<SignInResponse>(
      `${BASE_URL}/cn/access/login`,
      body.toString(),
      {headers, observe: 'response'}
    )
  }

  signUp(signUpForm: SignUpForm): Observable<SignUpResponse> {
    // const body = new HttpParams()
    //   .set(`nome`, signUpForm.nome)
    //   .set(`email`, signUpForm.email)
    //   .set(`estado`, signUpForm.estado)
    //   .set(`cidade`, signUpForm.cidade)
    //   .set(`senha`, signUpForm.senha)

    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // });

    console.log("here api-livrosproxy")
    console.log(signUpForm)

    return this.httpClient.post<SignUpResponse>(
      `${BASE_URL}/cn/criarUsuario`,
      signUpForm
    )
  }

}
