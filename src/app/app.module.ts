// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from './components/authentication/authentication.module';
import { LoggedAreaModule } from './components/logged-area/logged-area.module';

// Services
import { ServicesModule } from './services/services.module'

// Components
import { AppComponent } from './app.component';
import { IntroComponent } from './components/intro/intro.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

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
    FontAwesomeModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
