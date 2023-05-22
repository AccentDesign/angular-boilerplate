import { Route } from '@angular/router';
import { ForgotPwPageComponent } from '@modules/auth/pages/forgot-pw-page/forgot-pw-page.component';
import { LogInPageComponent } from '@modules/auth/pages/log-in-page/log-in-page.component';
import { LogOutPageComponent } from '@modules/auth/pages/log-out-page/log-out-page.component';
import { RegisterPageComponent } from '@modules/auth/pages/register-page/register-page.component';
import { ResetPwPageComponent } from '@modules/auth/pages/reset-pw-page/reset-pw-page.component';

export const AUTH_ROUTES: Route[] = [
  { path: 'login', component: LogInPageComponent },
  { path: 'logout', component: LogOutPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'forgot-password', component: ForgotPwPageComponent },
  { path: 'forgot-password/:token', component: ResetPwPageComponent }
];
