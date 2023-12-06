import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SettingsRoutes } from '@modules/settings/shared/settings-routes';
import { NavComponent } from '@modules/shared/components/nav/nav.component';

@Component({
  selector: 'app-my-settings',
  standalone: true,
  imports: [NavComponent, RouterLinkActive, RouterLink, RouterOutlet, MatButtonModule, MatListModule, MatIconModule],
  templateUrl: './my-settings.component.html',
})
export class MySettingsComponent {
  navItems = [
    { label: 'Profile', route: SettingsRoutes.profile, icon: 'person' },
    { label: 'Password', route: SettingsRoutes.password, icon: 'key' },
  ];
}
