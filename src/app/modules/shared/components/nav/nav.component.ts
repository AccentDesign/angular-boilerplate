import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { AuthPaths } from "@modules/auth/shared/auth-routes";
import { DashboardPaths } from "@modules/dashboard/shared/dashboard-routes";
import { SettingsPaths } from "@modules/settings/shared/settings-routes";

@Component({
  selector: "app-nav",
  standalone: true,
  templateUrl: "./nav.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {
  protected readonly AuthPaths = AuthPaths;
  protected readonly DashboardPaths = DashboardPaths;
  protected readonly SettingsPaths = SettingsPaths;

  open = signal(false);

  close() {
    this.open.set(false);
  }

  toggle() {
    this.open.set(!this.open());
  }
}
