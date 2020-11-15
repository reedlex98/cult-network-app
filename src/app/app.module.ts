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

// Services
import { ServicesModule } from './services/services.module'

// Components
import { AppComponent } from './app.component';
import { IntroComponent } from './components/intro/intro.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptorService } from './shared/services/loading-intercept.service';

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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
