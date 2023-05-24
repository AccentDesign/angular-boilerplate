import { Injectable } from '@angular/core';

export enum LocalStorageKeys {
  USER = 'user',
  TOKEN = 'token',
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  set(key: LocalStorageKeys, value: string | object) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: LocalStorageKeys) {
    const item = localStorage.getItem(key);
    if (item === null) return null;
    try {
      return JSON.parse(item);
    } catch (e) {
      return null;
    }
  }

  remove(key: LocalStorageKeys) {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
