import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SettingsRoutes } from '@modules/settings/shared/settings-routes';
import { NavComponent } from '@modules/shared/components/nav/nav.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-my-settings',
  standalone: true,
  imports: [NavComponent, RouterLinkActive, RouterLink, RouterOutlet, HlmButtonDirective],
  templateUrl: './my-settings.component.html',
})
export class MySettingsComponent {
  navItems = [
    { label: 'Profile', route: SettingsRoutes.profile },
    { label: 'Password', route: SettingsRoutes.password },
  ];
}
