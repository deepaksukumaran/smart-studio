import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private ngxService: NgxUiLoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.showLoader();

    const modifiedReq = req.reportProgress ? req : this.setHeader(req);

    return next.handle(modifiedReq)
      .pipe(tap((event: HttpEvent<any>) => {

        if (event instanceof HttpResponse) {
          this.hideLoader();
        }
      },
        (error: HttpErrorResponse) => {
          this.hideLoader();
        }));
  }

  /* Private Methods */
  private showLoader(): void {
    this.ngxService.start();
  }

  private hideLoader(): void {
    this.ngxService.stop();
  }

  private setHeader(req: HttpRequest<any>) {
    let modifiedReq: HttpRequest<any>;

    switch (req.method) {
      case 'GET':
      case 'DELETE':
      case 'PUT':
      case 'POST':
        modifiedReq = req.clone({
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(':jwt')}`,
          })
        });
        break;
    }

    return modifiedReq;
  }
}
