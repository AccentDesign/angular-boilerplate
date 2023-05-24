import { Route } from '@angular/router';
import { ForgotPwPageComponent } from '@modules/auth/pages/forgot-pw-page/forgot-pw-page.component';
import { LogInPageComponent } from '@modules/auth/pages/log-in-page/log-in-page.component';
import { LogOutPageComponent } from '@modules/auth/pages/log-out-page/log-out-page.component';
import { RegisterPageComponent } from '@modules/auth/pages/register-page/register-page.component';
import { ResetPwPageComponent } from '@modules/auth/pages/reset-pw-page/reset-pw-page.component';
import { AuthRoutes } from '@modules/auth/shared/auth-routes';

export const AUTH_ROUTES: Route[] = [
  { path: AuthRoutes.logIn, component: LogInPageComponent },
  { path: AuthRoutes.logOut, component: LogOutPageComponent },
  { path: AuthRoutes.register, component: RegisterPageComponent },
  { path: AuthRoutes.forgotPassword, component: ForgotPwPageComponent },
  { path: AuthRoutes.resetPassword, component: ResetPwPageComponent }
];
