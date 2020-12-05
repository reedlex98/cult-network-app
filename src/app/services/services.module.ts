import { NgModule } from '@angular/core';

// Dependecies
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Proxy services
import { ApiLivrosProxyService } from './proxy/api-livros-proxy.service'
import { GoogleBooksProxyService } from './proxy/google-books.proxy.service';
import { WhatsappProxyService } from './proxy/whatsapp.proxy.service';

// Util
import { UfService } from './util/services/uf.service';

// Base services
import { SignUpService } from './base/sign-up.service';
import { SignInService } from './base/sign-in.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiLivrosProxyService,
    GoogleBooksProxyService,
    WhatsappProxyService,
    UfService,
    SignUpService,
    SignInService
  ],
})
export class ServicesModule { }
