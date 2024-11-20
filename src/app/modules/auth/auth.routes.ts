import { Route } from "@angular/router";
import { AuthRoutes } from "@modules/auth/shared/auth-routes";

export default [
  {
    path: AuthRoutes.logIn,
    loadComponent: () => import("./pages/log-in-page/log-in-page.component")
  },
  {
    path: AuthRoutes.logOut,
    loadComponent: () => import("./pages/log-out-page/log-out-page.component")
  },
  {
    path: AuthRoutes.forgotPassword,
    loadComponent: () => import("./pages/forgot-pw-page/forgot-pw-page.component")
  },
  {
    path: AuthRoutes.resetPassword,
    loadComponent: () => import("./pages/reset-pw-page/reset-pw-page.component")
  }
] satisfies Route[];
