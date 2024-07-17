import { Routes } from '@angular/router';
import { AuthRoutes } from '@modules/auth/shared/auth-routes';
import { DashboardRoutes } from '@modules/dashboard/shared/dashboard-routes';
import { SettingsRoutes } from '@modules/settings/shared/settings-routes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login',
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
    loadComponent: () => import('@modules/shared/pages/error404-page/error404-page.component'),
  },
];
