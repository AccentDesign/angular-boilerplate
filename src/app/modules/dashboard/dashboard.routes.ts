import { Route } from "@angular/router";
import { DashboardRoutes } from "@modules/dashboard/shared/dashboard-routes";
import { AuthGuard } from "@modules/shared/guards/auth.guard";

export default [
  {
    path: DashboardRoutes.dashboard,
    loadComponent: () => import("./pages/dashboard-page/dashboard-page.component"),
    canActivate: [AuthGuard]
  }
] satisfies Route[];
