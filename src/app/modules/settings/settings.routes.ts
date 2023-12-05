import { Route } from '@angular/router';
import { MySettingsComponent } from '@modules/settings/pages/my-settings/my-settings.component';
import { SettingsRoutes } from '@modules/settings/shared/settings-routes';
import { AuthGuard } from '@modules/shared/guards/auth.guard';

export default [
  {
    path: '',
    component: MySettingsComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'profile' },
      {
        path: SettingsRoutes.profile,
        loadComponent: () => import('./pages/my-profile/my-profile.component'),
      },
      {
        path: SettingsRoutes.password,
        loadComponent: () => import('./pages/my-password/my-password.component'),
      },
    ],
  },
] satisfies Route[];
