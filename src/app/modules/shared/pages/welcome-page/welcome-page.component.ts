import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { AuthPaths } from '@modules/auth/shared/auth-routes';
import { ElementStyleDirective } from '@modules/shared/directives/element-style.directive';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    ElementStyleDirective
  ],
  templateUrl: './welcome-page.component.html'
})
export class WelcomePageComponent {
  protected readonly AuthPaths = AuthPaths;
}
