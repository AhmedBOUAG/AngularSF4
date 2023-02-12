import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../services/token-storage.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { CommonUtils } from '../Utils/CommonUtils';
//import { CommonUtils } from '../Utils/CommonUtils';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  notRequireTokenRoutes: string[] = CommonUtils.NOT_REQUIRE_TOKEN_ROUTES;
  constructor(
    private token: TokenStorageService,
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    const calledApiName = req.url.split('/').slice(-1)[0];
    console.log(calledApiName);
    /*if ('login_check' === calledApiName) {
      if (token) {
        authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } else {*/

    if (this.notRequireTokenRoutes.includes(calledApiName)) {
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
        //que faire pour informer l'user que son token a expiré.
      }
      const error = err.error.message || err.statusText;
      this.authService.logout();

      return throwError(error);
      //}

      //return throwError('');
    })) as any;
  }
}
