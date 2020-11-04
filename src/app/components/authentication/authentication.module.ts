// Modules
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';

// Services
import { ServicesModule } from 'src/app/services/services.module'

// Components
import { AuthenticationComponent } from './authentication.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CarouselModule } from 'ngx-bootstrap/carousel'
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AuthenticationComponent,
    SignUpFormComponent,
    SignInFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule,
    AuthenticationRoutingModule,
    MDBBootstrapModule.forRoot(),
    CarouselModule.forRoot()
  ],
  bootstrap: [
    AuthenticationComponent
  ]
})
export class AuthenticationModule { }
