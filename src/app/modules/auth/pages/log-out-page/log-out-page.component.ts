import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthPaths } from '@modules/auth/shared/auth-routes';
import { AuthService } from '@modules/auth/shared/auth.service';
import { LogoComponent } from '@modules/shared/components/logo/logo.component';
import { ButtonDirective } from '@modules/shared/directives/button.directive';
import { SvgIconDirective } from '@modules/shared/directives/svg-icon.directive';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-log-out-page',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    SvgIconDirective,
    LogoComponent,
    ButtonDirective
  ],
  templateUrl: './log-out-page.component.html'
})
export class LogOutPageComponent implements OnInit {
  protected readonly AuthPaths = AuthPaths;
  private authService = inject(AuthService);

  async ngOnInit(): Promise<void> {
    try {
      await firstValueFrom(this.authService.logOut());
    } catch (error) {
      // do nothing
    }
  }
}
