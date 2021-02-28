import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}

  intercept(request, next): Observable<HttpEvent<any>> {

    const modifiedReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(modifiedReq)
    return next.handle(modifiedReq);
  }
}