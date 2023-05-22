import { Route } from '@angular/router';
import { DashboardPageComponent } from '@modules/dashboard/pages/dashboard-page/dashboard-page.component';
import { AuthGuard } from '@modules/shared/guards/auth.guard';

export const DASHBOARD_ROUTES: Route[] = [
  { path: '', component: DashboardPageComponent, canActivate: [AuthGuard] }
];
