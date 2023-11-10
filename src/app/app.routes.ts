import { Routes } from '@angular/router';
import { AuthRoutes } from '@modules/auth/shared/auth-routes';
import { DashboardRoutes } from '@modules/dashboard/shared/dashboard-routes';
import { SettingsRoutes } from '@modules/settings/shared/settings-routes';
import { Error404PageComponent } from '@modules/shared/pages/error404-page/error404-page.component';
import { WelcomePageComponent } from '@modules/shared/pages/welcome-page/welcome-page.component';

export const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent,
  },
  {
    path: AuthRoutes.base,
    loadChildren: () => import('@modules/auth/auth.routes'),
  },
  {
    path: DashboardRoutes.base,
    loadChildren: () => import('@modules/dashboard/dashboard.routes'),
  },
  {
    path: SettingsRoutes.base,
    loadChildren: () => import('@modules/settings/settings.routes'),
  },
  {
    path: '**',
    component: Error404PageComponent,
  }
];
