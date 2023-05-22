import { Route } from '@angular/router';
import { MyPasswordComponent } from '@modules/settings/pages/my-password/my-password.component';
import { MyProfileComponent } from '@modules/settings/pages/my-profile/my-profile.component';
import { MySettingsComponent } from '@modules/settings/pages/my-settings/my-settings.component';
import { AuthGuard } from '@modules/shared/guards/auth.guard';

export const SETTINGS_ROUTES: Route[] = [
  {
    path: '',
    component: MySettingsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'profile' },
      { path: 'profile', component: MyProfileComponent, canActivate: [AuthGuard] },
      { path: 'password', component: MyPasswordComponent, canActivate: [AuthGuard] }
    ],
  }
];
