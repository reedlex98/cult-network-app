import { DefaultResponse } from './../dto/default.response';
import { GoogleBooksProxyService } from './../proxy/google-books.proxy.service';
import { AddBookForm } from './../dto/add-book-form';
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
import { IsbnValidator } from '../util/validators/isbn-validator';

// Services
import { ApiLivrosProxyService } from '../proxy/api-livros-proxy.service';
import { tap } from 'rxjs/operators';
import { BookResponse } from '../dto/book.response';

@Injectable()
export class AddBookService {
  public addBookForm: FormGroup;
  public searchBookForm: FormGroup;
  public errorMessages = {
    isbn: [
      // {
      //   type: 'required',
      //   message: 'Campo obrigatório',
      // },
      {
        type: 'isInvalidIsbn',
        message: 'Digite um ISBN válido',
      },
    ],
    titulo: [
      {
        type: 'required',
        message: 'Campo obrigatório',
      },
    ],
    autor: [
      {
        type: 'required',
        message: 'Campo obrigatório',
      },
    ],
    idioma: [
      {
        type: 'required',
        message: 'Campo obrigatório',
      },
    ],
  };

  constructor(
    private apiLivrosProxyService: ApiLivrosProxyService,
    private googleBooksProxyService: GoogleBooksProxyService,
    private formBuilder: FormBuilder
  ) {}

  public getErrorMessages(): any {
    return this.errorMessages;
  }

  public getSearchBookForm(): FormGroup {
    this.searchBookForm = this.formBuilder.group({
      isbn: new FormControl(
        '',
        Validators.compose([Validators.required, IsbnValidator.validIsbn])
      ),
    });
    return this.searchBookForm;
  }

  public getAddBookForm(): FormGroup {
    this.addBookForm = this.formBuilder.group({
      isbn: new FormControl('', Validators.compose([IsbnValidator.validIsbn])),
      titulo: new FormControl('', Validators.compose([Validators.required])),
      autor: new FormControl('', Validators.compose([Validators.required])),
      descricaoLivro: new FormControl('', Validators.compose([Validators.required])),
      qtdTotalPaginas: new FormControl('', Validators.compose([Validators.required])),
      idioma: new FormControl(''),
      dataEdicao: new FormControl(''),
    });
    return this.addBookForm;
  }

  public searchBookByIsbn(isbn: string) {
    // this.googleBooksProxyService.searchBookByIsbn(isbn).pipe(
    //   tap((searchedBook) => {
    //     this.addBookForm.patchValue({
    //       titulo: searchedBook.title,
    //       autor: searchedBook.authors,
    //       descricaoLivro: searchedBook.description,
    //       qtdTotalPaginas: searchedBook.pageCount,
    //       idioma: searchedBook.language,
    //       dataEdicao: searchedBook.publishedDate,
    //     });
    //   })
    // );
    return this.googleBooksProxyService.searchBookByIsbn(isbn);
  }

  public patchSearchedBookValueToForm(isbn, searchedBook: BookResponse) {
    this.addBookForm.patchValue({
      isbn,
      titulo: searchedBook.title,
      autor: searchedBook.authors.join(', '),
      descricaoLivro: searchedBook.description || searchedBook.title,
      qtdTotalPaginas: searchedBook.pageCount,
      idioma: searchedBook.language,
      dataEdicao: new Date(searchedBook.publishedDate)
        .toISOString()
        .substr(0, 10),
    });
    return this.addBookForm;
  }

  public addNewBook(addBookForm: AddBookForm): Observable<DefaultResponse> {
    return this.apiLivrosProxyService.registerNewBook(addBookForm);
  }
}
