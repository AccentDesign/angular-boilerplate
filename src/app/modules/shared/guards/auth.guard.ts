import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthPaths } from '@modules/auth/shared/auth-routes';
import { AuthRepository } from '@modules/auth/shared/auth.repository';
import { SettingsPaths } from '@modules/settings/shared/settings-routes';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private authRepository = inject(AuthRepository);
  private router = inject(Router);

  private readonly allowedPaths = [
    SettingsPaths.profile,
    SettingsPaths.password
  ];

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const user = this.authRepository.currentUser();
    const token = this.authRepository.accessToken();

    if (!user || !token) {
      return this.navigateLogin();
    }

    const isAllowed = this.allowedPaths.includes(state.url);

    if (user.is_verified || isAllowed) {
      return true;
    }

    return this.navigateProfile();
  }

  async navigateLogin(): Promise<boolean> {
    await this.router.navigateByUrl(AuthPaths.logIn);
    return false;
  }

  async navigateProfile(): Promise<boolean> {
    await this.router.navigateByUrl(SettingsPaths.profile);
    return false;
  }
}
