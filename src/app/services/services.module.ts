import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiLivrosProxyService } from './proxy/api-livros-proxy.service'
import { SignUpService } from './base/sign-up.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UfService } from './util/services/uf.service';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiLivrosProxyService,
    UfService,
    SignUpService
  ],
})
export class ServicesModule { }
