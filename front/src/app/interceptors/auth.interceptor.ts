import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../services/token-storage.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { CommonUtils } from '../Utils/CommonUtils';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  tokenLessRoutes: string[] = CommonUtils.TOKEN_LESS_ROUTES;
  constructor(
    private tokenService: TokenStorageService,
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.tokenService.getToken();
    const calledApiName = req.url.split('/').slice(-1)[0];
    if (this.tokenLessRoutes.includes(calledApiName)) {
      const authReq = req.clone({
        headers: req.headers.set('Accept', 'application/json')
      });

      return next.handle(authReq);
    }

    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    //}

    return next.handle(authReq).pipe(catchError(err => {
      //if(!this.utils.checkExcludeApi.include(calledApiName)) {
      if (err.status === 401 || 'Expired JWT Token' === err.error.detail) {
        this.authService.expired();
      }
      //const error = err.error.message || err.statusText;
      this.authService.logout();

      return throwError(err);
      //}

      //return throwError('');
    })) as any;
  }
}
