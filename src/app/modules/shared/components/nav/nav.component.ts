import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthPaths } from '@modules/auth/shared/auth-routes';
import { DashboardPaths } from '@modules/dashboard/shared/dashboard-routes';
import { SettingsPaths } from '@modules/settings/shared/settings-routes';
import { provideIcons } from '@ng-icons/core';
import { lucideKey, lucideLogOut, lucideUser } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
} from '@spartan-ng/ui-menu-helm';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    NgOptimizedImage,
    HlmButtonDirective,
    HlmMenuGroupComponent,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    HlmMenuItemDirective,
    HlmMenuShortcutComponent,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmIconComponent,
    HlmMenuItemIconDirective,
  ],
  providers: [
    provideIcons({
      lucideLogOut,
      lucideKey,
      lucideUser,
    }),
  ],
  templateUrl: './nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  protected readonly AuthPaths = AuthPaths;
  protected readonly DashboardPaths = DashboardPaths;
  protected readonly SettingsPaths = SettingsPaths;
}
