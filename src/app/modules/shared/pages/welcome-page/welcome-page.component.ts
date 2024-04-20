import { Component } from '@angular/core';
import { AuthPaths } from '@modules/auth/shared/auth-routes';
import { LogoComponent } from '@modules/shared/components/logo/logo.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [LogoComponent, HlmButtonDirective, HlmSeparatorDirective],
  templateUrl: './welcome-page.component.html',
})
export default class WelcomePageComponent {
  protected readonly AuthPaths = AuthPaths;
}
