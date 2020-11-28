import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { SignInService } from '../../services/base/sign-in.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private signInService: SignInService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const tokenResponseValue = this.signInService.tokenResponseValue;

    if (tokenResponseValue) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/sign-in'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
