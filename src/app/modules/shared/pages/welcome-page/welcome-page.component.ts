import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { AuthPaths } from '@modules/auth/shared/auth-routes';
import { LogoComponent } from '@modules/shared/components/logo/logo.component';
import { ButtonDirective } from '@modules/shared/directives/button.directive';
import { SvgIconDirective } from '@modules/shared/directives/svg-icon.directive';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    SvgIconDirective,
    LogoComponent,
    ButtonDirective
  ],
  templateUrl: './welcome-page.component.html'
})
export class WelcomePageComponent {
  protected readonly AuthPaths = AuthPaths;
}
