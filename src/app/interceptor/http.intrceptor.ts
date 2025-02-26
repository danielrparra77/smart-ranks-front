import { LocalStorageService } from '../service/local-storage/local-storage.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { ICredentialsUC } from '../common/credentials.uc';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

@Injectable()
export class IHttpInterceptor extends ICredentialsUC implements HttpInterceptor {

  constructor(localStorageService: LocalStorageService, router: Router) {
    super(localStorageService, router);
  }

  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('user/login'))
      return handler.handle(req);
    const credentials = this.getCredentials();
    req = req.clone({
      url:  req.url,
      setHeaders: {
        Authorization: `Bearer ${credentials.access_token}`
      }
    });
    let self = this;
    return handler.handle(req).pipe(
      catchError(function (err) {
        if (err.status == 401)
          self.signOut();
      return of(err);
    }));
  }
}