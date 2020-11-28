import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { SignInService } from './services/base/sign-in.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  public SPINNER = SPINNER;
  constructor(private signInService: SignInService, private router: Router) {}

  onChangeRoute() {
    if (
      this.router.url === '/auth/sign-in' ||
      this.router.url === '/auth/sign-up' ||
      this.router.url === '/'
    ) {
      if (localStorage.getItem('tokenResponse')) {
        this.router.navigate(['app/dashboard']);
      }
    }
  }
}
