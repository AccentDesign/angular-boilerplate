import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { environment } from '@environments/environment';
import { AuthRoutes } from '@modules/auth/shared/auth-routes';
import { DashboardRoutes } from '@modules/dashboard/shared/dashboard-routes';
import { SettingsRoutes } from '@modules/settings/shared/settings-routes';
import { GlobalHttpInterceptor } from '@modules/shared/interceptors/global-http.interceptor';
import { Error404PageComponent } from '@modules/shared/pages/error404-page/error404-page.component';
import { WelcomePageComponent } from '@modules/shared/pages/welcome-page/welcome-page.component';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter([
      {
        path: '',
        component: WelcomePageComponent
      },
      {
        path: AuthRoutes.base,
        loadChildren: () => import('./app/modules/auth/auth.routes').then(m => m.AUTH_ROUTES),
      },
      {
        path: DashboardRoutes.base,
        loadChildren: () => import('./app/modules/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
      },
      {
        path: SettingsRoutes.base,
        loadChildren: () => import('./app/modules/settings/settings.routes').then(m => m.SETTINGS_ROUTES),
      },
      {
        path: '**',
        component: Error404PageComponent
      }
    ], withComponentInputBinding()),
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptor, multi: true }
  ]
}).catch((err) => console.error(err));
