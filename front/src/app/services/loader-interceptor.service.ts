import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { CommonUtils } from '../Utils/CommonUtils';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  private excludedRoutes: string[] = CommonUtils.EXCLUDED_ROUTES_FROM_LOADER;

  constructor(
    private loaderService: LoaderService
  ) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const calledApiName = req.url.split('/').slice(-1)[0];
    if (!this.excludedRoutes.includes(calledApiName)) {
      this.loaderService.isLoading.next(true);
      this.requests.push(req);
    }

    return new Observable((observer: any) => {
      const subscription = next.handle(req).subscribe(event => {
        if (event instanceof HttpResponse) {
          this.removeRequest(req);
          observer.next(event);
        }
      }, err => {
        this.removeRequest(req);
        observer.error(err);
      },
        () => {
          this.removeRequest(req);
          observer.complete();
        });
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
