import { Component } from '@angular/core';
import { AuthPaths } from '@modules/auth/shared/auth-routes';
import { LogoComponent } from '@modules/shared/components/logo/logo.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-error404-page',
  standalone: true,
  imports: [LogoComponent, HlmButtonDirective],
  templateUrl: './error404-page.component.html',
})
export default class Error404PageComponent {
  protected readonly AuthPaths = AuthPaths;
}
