import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { AuthPaths } from '@modules/auth/shared/auth-routes';
import { LogoComponent } from '@modules/shared/components/logo/logo.component';
import { SvgIconDirective } from '@modules/shared/directives/svg-icon.directive';
import { TailwindDirective } from '@modules/shared/directives/tailwind.directive';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    SvgIconDirective,
    TailwindDirective,
    LogoComponent
  ],
  templateUrl: './welcome-page.component.html'
})
export class WelcomePageComponent {
  protected readonly AuthPaths = AuthPaths;
}
