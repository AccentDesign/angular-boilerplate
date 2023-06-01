import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { enableProdMode, ErrorHandler, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { environment } from '@environments/environment';
import { AuthRoutes } from '@modules/auth/shared/auth-routes';
import { DashboardRoutes } from '@modules/dashboard/shared/dashboard-routes';
import { SettingsRoutes } from '@modules/settings/shared/settings-routes';
import { GlobalHttpInterceptor } from '@modules/shared/interceptors/global-http.interceptor';
import { Error404PageComponent } from '@modules/shared/pages/error404-page/error404-page.component';
import { WelcomePageComponent } from '@modules/shared/pages/welcome-page/welcome-page.component';
import * as Sentry from '@sentry/angular-ivy';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

if (environment.sentryDsn) {
  Sentry.init({
    dsn: environment.sentryDsn,
    integrations: [
      // Registers and configures the Tracing integration,
      // which automatically instruments your application to monitor its
      // performance, including custom Angular routing instrumentation
      new Sentry.BrowserTracing({
        // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ['localhost', /^https:\/\/example\.io\/api/],
        routingInstrumentation: Sentry.routingInstrumentation,
      }),
      // Registers the Replay integration,
      // which automatically captures Session Replays
      new Sentry.Replay(),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

const routes = [
  {
    path: '',
    component: WelcomePageComponent,
  },
  {
    path: AuthRoutes.base,
    loadChildren: () => import('@modules/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: DashboardRoutes.base,
    loadChildren: () => import('@modules/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
  },
  {
    path: SettingsRoutes.base,
    loadChildren: () => import('@modules/settings/settings.routes').then(m => m.SETTINGS_ROUTES),
  },
  {
    path: '**',
    component: Error404PageComponent,
  }
];

const providers = [
  importProvidersFrom(HttpClientModule),
  provideRouter(routes, withComponentInputBinding()),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: GlobalHttpInterceptor, multi: true,
  },
  (environment.sentryDsn) ? {
    provide: ErrorHandler,
    useValue: Sentry.createErrorHandler({ showDialog: true }),
  } : {
    provide: ErrorHandler,
    useValue: ErrorHandler,
  }
];

bootstrapApplication(AppComponent, { providers }).catch((err) => console.error(err));
