import { GetUserResponse } from './../dto/get-user.response';
import { ApiLivrosProxyService } from './../proxy/api-livros-proxy.service';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchBookResponse } from '../dto/search-book.response';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { WhatsappProxyService } from '../proxy/whatsapp.proxy.service';

@Injectable()
export class SearchBookService {
  public searchBookForm: FormGroup;

  constructor(
    private apiLivrosProxyService: ApiLivrosProxyService,
    private whatsappProxyService: WhatsappProxyService,
    private formBuilder: FormBuilder
  ) {}

  public getUserById(id: string): Observable<GetUserResponse> {
    return this.apiLivrosProxyService.getUserById(id);
  }

  public getBookByTitle(titulo: string): Observable<SearchBookResponse[]> {
    return this.apiLivrosProxyService.getBookByTitle(titulo);
  }

  public getBookByAuthor(autor: string): Observable<SearchBookResponse[]> {
    return this.apiLivrosProxyService.getBookByTitle(autor);
  }

  public getUserList(): Observable<GetUserResponse[]> {
    return this.apiLivrosProxyService.getUserList();
  }

  public getSearchBookForm(): FormGroup {
    this.searchBookForm = this.formBuilder.group({
      searchTerm: new FormControl('', Validators.compose([])),
      maxDistance: new FormControl('', Validators.compose([])),
    });
    return this.searchBookForm;
  }

  public openChatByPhoneNumber(phone) {
    this.whatsappProxyService.openChatByPhoneNumber(phone);
  }
}
