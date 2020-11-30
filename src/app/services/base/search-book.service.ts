import { ApiLivrosProxyService } from './../proxy/api-livros-proxy.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchBookResponse } from '../dto/search-book.response';
import { title } from 'process';

@Injectable()
export class SearchBookService {
  constructor(private apiLivrosProxyService: ApiLivrosProxyService) {}

  public getBookByTitle(titulo: string): Observable<SearchBookResponse[]> {
    return this.apiLivrosProxyService.getBookByTitle(titulo);
  }

  public getBookByAuthor(autor: string): Observable<SearchBookResponse[]> {
    return this.apiLivrosProxyService.getBookByTitle(autor);
  }
}
