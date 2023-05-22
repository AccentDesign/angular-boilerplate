import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthRepository } from '@modules/auth/shared/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private readonly allowedPaths = [
    '/settings/profile'
  ];

  constructor(
    private authRepository: AuthRepository,
    private router: Router
  ) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (!this.authRepository.isLoggedIn()) {
      return this.navigateLogin();
    }

    const user = this.authRepository.currentUser;
    if (!user) {
      return this.navigateLogin();
    }

    const isAllowed = this.allowedPaths.includes(state.url);

    if (user.is_verified || isAllowed) {
      return true;
    }

    return this.navigateProfile();
  }

  async navigateLogin(): Promise<boolean> {
    await this.router.navigateByUrl('/auth/login');
    return false;
  }

  async navigateProfile(): Promise<boolean> {
    await this.router.navigateByUrl('/settings/profile');
    return false;
  }
}
