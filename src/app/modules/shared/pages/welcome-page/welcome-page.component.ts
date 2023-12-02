import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { AuthPaths } from '@modules/auth/shared/auth-routes';
import { LogoComponent } from '@modules/shared/components/logo/logo.component';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './welcome-page.component.html'
})
export default class WelcomePageComponent {
  protected readonly AuthPaths = AuthPaths;
}
