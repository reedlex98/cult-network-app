import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/services/base/sign-in.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
  public canShowBackground = false;

  constructor(private signInService: SignInService, private router: Router) {}

  onChangeRoute() {
    if (
      this.router.url.startsWith('/auth') ||
      this.router.url === '/'
    ) {
      if (localStorage.getItem('tokenResponse')) {
        this.router.navigate(['app/dashboard']);
      } else {
        this.canShowBackground = true;
      }
    }
  }
}
