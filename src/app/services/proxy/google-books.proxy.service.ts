// Dependencies
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// DTOs
import { BookResponse } from '../dto/book.response';
import { map } from 'rxjs/operators';

const BASE_URL = 'https://www.googleapis.com/books/v1';
// https://www.googleapis.com/books/v1/volumes?q=isbn:9788544102947
@Injectable()
export class GoogleBooksProxyService {

  constructor(
    private httpClient: HttpClient
  ) { }

  searchBookByIsbn(isbn: string): Observable<BookResponse | null> {
    return this.httpClient.get<any>(
      `${BASE_URL}/volumes?q=isbn%3A${isbn}`
    )
    .pipe(
      map(res => (res.items ? {
        title: res.items[0].volumeInfo.title,
        authors: res.items[0].volumeInfo.authors,
        publishedDate: res.items[0].volumeInfo.publishedDate,
        description: res.items[0].volumeInfo.description,
        pageCount: res.items[0].volumeInfo.pageCount,
        language: res.items[0].volumeInfo.language,
        country: res.items[0].accessInfo.country,
        textSnippet: res.items[0].searchInfo.textSnippet,
      } as BookResponse : null))
    )
    ;
  }

}
