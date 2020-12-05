// Dependencies
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// DTOs
import { BookResponse } from '../dto/book.response';
import { map } from 'rxjs/operators';
import { basename } from 'path';

const BASE_URL = 'https://api.whatsapp.com';
// https://www.googleapis.com/books/v1/volumes?q=isbn:9788544102947
@Injectable()
export class WhatsappProxyService {
  constructor(private httpClient: HttpClient) {}

  openChatByPhoneNumber(phone: string) {
    window.location.href = `${BASE_URL}/send?phone=55${phone}`;
  }
}
