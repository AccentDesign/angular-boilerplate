import { Route } from '@angular/router';
import { DashboardPageComponent } from '@modules/dashboard/pages/dashboard-page/dashboard-page.component';
import { DashboardRoutes } from '@modules/dashboard/shared/dashboard-routes';
import { AuthGuard } from '@modules/shared/guards/auth.guard';

export const DASHBOARD_ROUTES: Route[] = [
  { path: DashboardRoutes.dashboard, component: DashboardPageComponent, canActivate: [AuthGuard] }
];
