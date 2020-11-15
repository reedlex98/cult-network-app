import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SignInService } from 'src/app/services/base/sign-in.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
      private signInService: SignInService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const tokenResponse = this.signInService.tokenResponseValue;
        if (tokenResponse && tokenResponse.access_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${tokenResponse.access_token}`
                }
            });
        }

        return next.handle(request);
    }
}
