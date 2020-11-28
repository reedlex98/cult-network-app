import { ApiLivrosProxyService } from './../proxy/api-livros-proxy.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLibraryBook } from '../dto/user-library-book';

@Injectable()
export class MyLibraryService {
  constructor(private apiLivrosProxyService: ApiLivrosProxyService) {}

  public getUserLibraryBooks(): Observable<UserLibraryBook[]> {
    return this.apiLivrosProxyService.getUserLibraryBooks();
  }
}
