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
    return this.checkAuthenticationAndRedirect(state.url);
  }

  async canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this.canActivate(childRoute, state);
  }

  private async checkAuthenticationAndRedirect(url: string): Promise<boolean> {
    const user = this.authRepository.currentUser();
    const token = this.authRepository.accessToken();

    if (!user || !token) {
      await this.router.navigateByUrl(AuthPaths.logIn);
      return false;
    }

    if (user.is_verified || this.allowedPaths.includes(url)) {
      return true;
    }

    await this.router.navigateByUrl(SettingsPaths.profile);
    return false;
  }
}
