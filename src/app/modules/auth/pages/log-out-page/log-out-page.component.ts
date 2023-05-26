import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthPaths } from '@modules/auth/shared/auth-routes';
import { AuthService } from '@modules/auth/shared/auth.service';
import { ButtonStyleDirective } from '@modules/shared/directives/button-style.directive';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-log-out-page',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    ButtonStyleDirective
  ],
  templateUrl: './log-out-page.component.html'
})
export class LogOutPageComponent implements OnInit {
  protected readonly AuthPaths = AuthPaths;

  constructor(
    private authService: AuthService
  ) {
  }

  async ngOnInit(): Promise<void> {
    try {
      await firstValueFrom(this.authService.logOut());
    } catch (error) {
      // do nothing
    }
  }
}
