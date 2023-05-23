import { Injectable } from '@angular/core';
import { User } from '@modules/auth/shared/interfaces/user';
import { LocalStorageService } from '@modules/shared/services/local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthRepository {
  private _user$ = new BehaviorSubject<User | null>(null);
  user$ = this._user$.asObservable();

  constructor(
    private storageService: LocalStorageService
  ) {
    const storedUser = this.storageService.get('user');
    if (storedUser) {
      this._user$.next(storedUser);
    }
  }

  get accessToken() {
    return localStorage.getItem('accessToken');
  }

  get currentUser(): User | null {
    return this._user$.getValue();
  }

  setAccessToken(accessToken: string) {
    this.storageService.set('accessToken', accessToken);
  }

  isLoggedIn(): boolean {
    return this.accessToken != null;
  }

  setUser(user: User) {
    this._user$.next(user);
     this.storageService.set('user', user);
  }

  clear() {
    this.storageService.remove('accessToken');
    this.storageService.remove('user');
    this._user$.next(null);
  }
}
