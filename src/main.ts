import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { GlobalHttpInterceptor } from '@modules/shared/interceptors/global-http.interceptor';
import { Error404PageComponent } from '@modules/shared/pages/error404-page/error404-page.component';
import { WelcomePageComponent } from '@modules/shared/pages/welcome-page/welcome-page.component';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter([
      { path: '', component: WelcomePageComponent },
      {
        path: 'auth',
        loadChildren: () => import('./app/modules/auth/auth.routes').then(m => m.AUTH_ROUTES),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./app/modules/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
      },
      {
        path: 'settings',
        loadChildren: () => import('./app/modules/settings/settings.routes').then(m => m.SETTINGS_ROUTES),
      },
      { path: '**', component: Error404PageComponent }
    ]),
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptor, multi: true }
  ]
}).catch((err) => console.error(err));
