import { TestBed } from '@angular/core/testing';
import { LocalStorageKeys, LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  const localStorageMock = (function () {
    let store: { [key: string]: string } = {};
    return {
      getItem: function (key: string) {
        return store[key] || null;
      },
      setItem: function (key: string, value: string) {
        store[key] = value.toString();
      },
      removeItem: function (key: string) {
        delete store[key];
      },
      clear: function () {
        store = {};
      },
    };
  })();

  beforeEach(() => {
    TestBed.configureTestingModule({});

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    service = TestBed.inject(LocalStorageService);

    jest.spyOn(localStorage, 'getItem');
    jest.spyOn(localStorage, 'setItem');
    jest.spyOn(localStorage, 'removeItem');
    jest.spyOn(localStorage, 'clear');
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('set should store value to localStorage for strings', () => {
    const key = LocalStorageKeys.USER;
    const value = 'some string';
    service.set(key, value);
    expect(localStorage.getItem(key)).toEqual(value);
  });

  it('set should store value to localStorage for objects', () => {
    const key = LocalStorageKeys.USER;
    const value = { name: 'John Doe' };
    service.set(key, value);
    expect(JSON.parse(localStorage.getItem(key) ?? '')).toEqual(value);
  });

  it('get should retrieve value from localStorage for strings', () => {
    const key = LocalStorageKeys.USER;
    const value = 'some string';
    localStorage.setItem(key, value);
    expect(service.get(key)).toEqual(value);
  });

  it('get should retrieve value from localStorage for objects', () => {
    const key = LocalStorageKeys.USER;
    const value = { name: 'John Doe' };
    localStorage.setItem(key, JSON.stringify(value));
    expect(service.get(key)).toEqual(value);
  });

  it('get should return null if the key does not exist in localStorage', () => {
    const key = LocalStorageKeys.USER;
    localStorage.removeItem(key);
    expect(service.get(key)).toBeNull();
  });

  it('remove should remove key from localStorage', () => {
    const key = LocalStorageKeys.USER;
    const value = 'some string';
    localStorage.setItem(key, value);
    service.remove(key);
    expect(localStorage.getItem(key)).toBeNull();
  });

  it('clear should clear all keys from localStorage', () => {
    const userValue = { name: 'John Doe' };
    const tokenValue = 'random-token';
    localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(userValue));
    localStorage.setItem(LocalStorageKeys.TOKEN, tokenValue);
    service.clear();
    expect(localStorage.getItem(LocalStorageKeys.USER)).toBeNull();
    expect(localStorage.getItem(LocalStorageKeys.TOKEN)).toBeNull();
  });
});
