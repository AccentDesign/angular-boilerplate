import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthPaths } from '@modules/auth/shared/auth-routes';
import { AuthRepository } from '@modules/auth/shared/auth.repository';
import { catchError, Observable, of, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const authRepository = inject(AuthRepository);
  const router = inject(Router);
  const token = authRepository.accessToken();

  const clone = token ? req.clone({ headers: req.headers.set('Authorization', `bearer ${token}`) }) : req;

  return next(clone).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.error instanceof ErrorEvent) {
        console.error('A client side error occurred:', error.error.message);
      } else {
        console.error('A server side error occurred:', error.error.message);
        if (error.status === 401 || error.status === 403) {
          router.navigateByUrl(AuthPaths.logOut).then();
          return of(new HttpResponse({ status: error.status, statusText: error.statusText }));
        }
      }
      return throwError(() => error);
    }),
  );
};
