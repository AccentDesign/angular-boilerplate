import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SettingsRoutes } from '@modules/settings/shared/settings-routes';
import { NavComponent } from '@modules/shared/components/nav/nav.component';
import { SvgIconDirective } from '@modules/shared/directives/svg-icon.directive';
import { TailwindDirective } from '@modules/shared/directives/tailwind.directive';

@Component({
  selector: 'app-my-settings',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    RouterLinkActive,
    RouterLink,
    RouterOutlet,
    SvgIconDirective,
    TailwindDirective
  ],
  templateUrl: './my-settings.component.html'
})
export class MySettingsComponent {
  navItems = [
    { label: 'Profile', route: SettingsRoutes.profile, icon: 'majestic-user-line' },
    { label: 'Password', route: SettingsRoutes.password, icon: 'majestic-key-line' },
  ];
}
