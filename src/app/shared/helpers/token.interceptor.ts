import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SignInService } from 'src/app/services/base/sign-in.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
      private signInService: SignInService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const tokenResponse = this.signInService.tokenResponseValue;
        if (request.url.includes('http://apitrocalivros.gear.host/api') && tokenResponse && tokenResponse.access_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${tokenResponse.access_token}`
                }
            });
            console.log('in the interceptor, token: ', tokenResponse.access_token)
        }

        return next.handle(request);
    }
}
