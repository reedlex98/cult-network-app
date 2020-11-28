import { Router } from '@angular/router';
// src/app/signInService/jwt.interceptor.ts
// ...
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SignInService } from 'src/app/services/base/sign-in.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class GlobalHttpErrorHandlingInterceptorService
  implements HttpInterceptor {
  constructor(
    private signInService: SignInService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err, caught) => {
        console.log('intercepting error');
        if (
          err.status === 401 &&
          request.url.includes('http://apitrocalivros.gear.host/api')
        ) {
          console.log('caiu aqui');
          this.toastr.show('O seu token expirou, logue-se novamente!');
          this.signInService.logout();
          this.router.navigate(['/auth/sign-in'], {
            queryParams: { returnUrl: this.router.url },
          });
        }
        return of(err);
      })
    );
  }
}
