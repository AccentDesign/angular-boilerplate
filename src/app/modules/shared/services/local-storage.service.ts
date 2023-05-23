import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  static USER_KEY = 'user';
  static TOKEN_KEY = 'token';

  set(key: string, value: string | object) {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  }

  get(key: string) {
    const item = localStorage.getItem(key);
    if (item === null) return item;
    try {
      return JSON.parse(item);
    } catch (e) {
      return item;
    }
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
