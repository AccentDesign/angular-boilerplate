import { Injectable, signal } from '@angular/core';
import { User } from '@modules/auth/shared/interfaces/user';
import { LocalStorageService } from '@modules/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRepository {
  readonly currentUser = signal<User | null>(null);
  readonly accessToken = signal<string | null>(null);

  constructor(
    private storageService: LocalStorageService
  ) {
    this.currentUser.set(this.storageService.get(LocalStorageService.USER_KEY));
    this.accessToken.set(this.storageService.get(LocalStorageService.TOKEN_KEY));
  }

  setAccessToken(token: string) {
    this.storageService.set(LocalStorageService.TOKEN_KEY, token);
    this.accessToken.set(token);
  }

  setUser(user: User) {
    this.storageService.set(LocalStorageService.USER_KEY, user);
    this.currentUser.set(user);
  }

  clear() {
    this.storageService.remove(LocalStorageService.TOKEN_KEY);
    this.storageService.remove(LocalStorageService.USER_KEY);
    this.currentUser.set(null);
    this.accessToken.set(null);
  }
}
