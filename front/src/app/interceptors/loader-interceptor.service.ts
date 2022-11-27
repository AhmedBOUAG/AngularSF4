// loader-interceptor.service.ts
import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: LoaderService) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercept Loader');
    const calledApiName = req.url.split('/').slice(-1)[0];
    this.requests.push(req);

    //  console.log(this.requests.length); // numero de la requete

    if ('login_check' !== calledApiName) {
      this.loaderService.isLoading.next(true);
    }
    return new Observable((observer: any) => {
      const subscription = next.handle(req).subscribe(event => {
        if (event instanceof HttpResponse) {
          this.removeRequest(req);
          observer.next(event);
        }
      }, err => {
        //alert('error' + err);
        this.removeRequest(req);
        observer.error(err);
      },
        () => {
          this.removeRequest(req);
          observer.complete();
        });
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
