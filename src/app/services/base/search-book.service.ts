import { ApiLivrosProxyService } from './../proxy/api-livros-proxy.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchBookResponse } from '../dto/search-book.response';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Injectable()
export class SearchBookService {
  public searchBookForm: FormGroup;

  constructor(
    private apiLivrosProxyService: ApiLivrosProxyService,
    private formBuilder: FormBuilder
  ) {}

  public getBookByTitle(titulo: string): Observable<SearchBookResponse[]> {
    return this.apiLivrosProxyService.getBookByTitle(titulo);
  }

  public getBookByAuthor(autor: string): Observable<SearchBookResponse[]> {
    return this.apiLivrosProxyService.getBookByTitle(autor);
  }

  public getSearchBookForm(): FormGroup {
    this.searchBookForm = this.formBuilder.group({
      searchTerm: new FormControl('', Validators.compose([])),
      maxDistance: new FormControl('', Validators.compose([]))
    });
    return this.searchBookForm;
  }
}
