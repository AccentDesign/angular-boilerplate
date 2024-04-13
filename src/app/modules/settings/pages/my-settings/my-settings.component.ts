import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SettingsRoutes } from '@modules/settings/shared/settings-routes';
import { NavComponent } from '@modules/shared/components/nav/nav.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmH1Directive, HlmH2Directive, HlmH3Directive } from '@spartan-ng/ui-typography-helm';

@Component({
  selector: 'app-my-settings',
  standalone: true,
  imports: [
    NavComponent,
    RouterLinkActive,
    RouterLink,
    RouterOutlet,
    HlmButtonDirective,
    HlmH1Directive,
    HlmH2Directive,
    HlmH3Directive,
  ],
  templateUrl: './my-settings.component.html',
})
export class MySettingsComponent {
  navItems = [
    { label: 'Profile', route: SettingsRoutes.profile },
    { label: 'Password', route: SettingsRoutes.password },
  ];
}
