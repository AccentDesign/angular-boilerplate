import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { AuthPaths } from '@modules/auth/shared/auth-routes';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage
  ],
  templateUrl: './welcome-page.component.html'
})
export class WelcomePageComponent {
  protected readonly AuthPaths = AuthPaths;
}
