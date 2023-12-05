import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { environment } from '@environments/environment';
import { GlobalHttpInterceptor } from '@modules/shared/interceptors/global-http.interceptor';
import * as Sentry from '@sentry/angular-ivy';
import { routes } from './app.routes';

if (environment.sentryDsn) {
  Sentry.init({ dsn: environment.sentryDsn });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true,
    },
    environment.sentryDsn
      ? {
          provide: ErrorHandler,
          useValue: Sentry.createErrorHandler({ showDialog: true }),
        }
      : {
          provide: ErrorHandler,
          useClass: ErrorHandler,
        },
  ],
};
