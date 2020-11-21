import { TokenInterceptor } from './shared/helpers/token.interceptor';
import { HttpClientModule } from '@angular/common/http';
// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from './components/authentication/authentication.module';
import { LoggedAreaModule } from './components/logged-area/logged-area.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from "ngx-ui-loader";

// Services
import { ServicesModule } from './services/services.module'

// Components
import { AppComponent } from './app.component';
import { IntroComponent } from './components/intro/intro.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalHttpErrorHandlingInterceptorService } from './shared/helpers/global-http-error-handling.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule,
    LoggedAreaModule,
    AuthenticationModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpErrorHandlingInterceptorService,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
