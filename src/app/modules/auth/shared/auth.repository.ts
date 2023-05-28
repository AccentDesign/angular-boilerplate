import { inject, Injectable, signal } from '@angular/core';
import { User } from '@modules/auth/shared/interfaces/user';
import { LocalStorageKeys, LocalStorageService } from '@modules/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRepository {
  readonly currentUser = signal<User | null>(null);
  readonly accessToken = signal<string | null>(null);
  private storageService = inject(LocalStorageService);

  constructor() {
    this.currentUser.set(this.storageService.get(LocalStorageKeys.USER));
    this.accessToken.set(this.storageService.get(LocalStorageKeys.TOKEN));
  }

  setAccessToken(token: string) {
    this.storageService.set(LocalStorageKeys.TOKEN, token);
    this.accessToken.set(token);
  }

  setUser(user: User) {
    this.storageService.set(LocalStorageKeys.USER, user);
    this.currentUser.set(user);
  }

  clear() {
    this.storageService.remove(LocalStorageKeys.TOKEN);
    this.storageService.remove(LocalStorageKeys.USER);
    this.currentUser.set(null);
    this.accessToken.set(null);
  }
}
