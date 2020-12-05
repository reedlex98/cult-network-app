import { ReportResponse } from './../dto/report.response';
import { GetUserResponse } from './../dto/get-user.response';
import { UserLibraryBook } from './../dto/user-library-book';
// Dependencies
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// DTOs
import { SignUpResponse } from '../dto/sign-up.response';
import { SignInResponse } from '../dto/sign-in-response';
import { SignUpForm } from '../dto/sign-up-form';
import { SignInForm } from '../dto/sign-in-form';
import { DefaultResponse } from '../dto/default.response';
import { SearchBookResponse } from '../dto/search-book.response';
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

  getUserById(idUser: string): Observable<GetUserResponse> {
    return this.httpClient.post<GetUserResponse>(
      `${BASE_URL}/cn/getUsuarioPorID`,
      null,
      {
        params: {
          idUser
        },
      }
    );
  }


  // getUserById(idUser: string): Observable<GetUserResponse> {
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');

  //   const urlSearchParams = new URLSearchParams();
  //   urlSearchParams.set('grant_type', 'password');
  //   urlSearchParams.set('username', signInForm.username);
  //   urlSearchParams.set('password', signInForm.password);

  //   const body = urlSearchParams.toString();

  //   return this.httpClient.post<GetUserResponse>(
  //     `${BASE_URL}/cn/access/login`, null,
  //   );
  // }


  getBookByAuthor(autor: string): Observable<UserLibraryBook[]> {
    return this.httpClient.post<SearchBookResponse[]>(
      `${BASE_URL}/cn/livro/getLivroAutor`,
      {
        autor,
      }
    );
  }

  getBookByTitle(titulo: string): Observable<SearchBookResponse[]> {
    return this.httpClient.post<SearchBookResponse[]>(
      `${BASE_URL}/cn/livro/getLivroTitulo`,
      {
        titulo,
      }
    );
  }

  getUserList(): Observable<GetUserResponse[]> {
    return this.httpClient.get<GetUserResponse[]>(
      `${BASE_URL}/cn/listarUsuarios`
    );
  }

  sendReport(message: string, reportedEmail: string) {
    return this.httpClient.post<ReportResponse>(
      `${BASE_URL}/livros/EnviarEmailDenuncia/${encodeURI(
        message
      )}?emailUser«${reportedEmail}`,
      {}
    );
  }

  deleteUserBook(id: string): Observable<string> {
    return this.httpClient.delete<string>(
      `${BASE_URL}/cn/livro/deletaLivroPorId/${id}`
    );
  }

  getUserData(): Observable<GetUserResponse> {
    return this.httpClient.get<GetUserResponse>(
      `${BASE_URL}/cn/getUsuarioLogado`
    );
  }

  updateUserData(updateUserForm: SignUpForm): Observable<DefaultResponse> {
    return this.httpClient.put<DefaultResponse>(
      `${BASE_URL}/cn/atualizarDadosPessoais`,
      updateUserForm
    );
  }

  getUserLibraryBooks(): Observable<UserLibraryBook[]> {
    return this.httpClient.get<UserLibraryBook[]>(
      `${BASE_URL}/cn/livro/consultarLivrosUsuarioLogado`
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

  signUp(signUpForm: SignUpForm): Observable<SignUpResponse> {
    return this.httpClient.post<SignUpResponse>(
      `${BASE_URL}/cn/criarUsuario`,
      signUpForm
    );
  }
}
