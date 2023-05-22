import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRepository } from '@modules/auth/shared/auth.repository';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authRepository: AuthRepository
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers = request.headers;

    const token = this.authRepository.accessToken;
    if (token) {
      headers = headers.set('Authorization', `bearer ${token}`);
    }

    request = request.clone({ headers });

    return next.handle(request).pipe(
      catchError((error) => {
        let handled = false;
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.log('error event');
          } else {
            switch (error.status) {
              case 401:
              case 403:
                this.router.navigateByUrl('/auth/logout').then(() => console.log('redirect to logout'));
                handled = true;
                break;
            }
          }
        }

        if (handled) {
          return of(error);
        } else {
          return throwError(() => error);
        }
      })
    );
  }
}
