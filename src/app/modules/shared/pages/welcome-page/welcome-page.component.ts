import { Component } from '@angular/core';
import { AuthPaths } from '@modules/auth/shared/auth-routes';
import { LogoComponent } from '@modules/shared/components/logo/logo.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { HlmH2Directive, HlmPDirective } from '@spartan-ng/ui-typography-helm';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [LogoComponent, HlmButtonDirective, HlmSeparatorDirective, HlmH2Directive, HlmPDirective],
  templateUrl: './welcome-page.component.html',
})
export default class WelcomePageComponent {
  protected readonly AuthPaths = AuthPaths;
}
