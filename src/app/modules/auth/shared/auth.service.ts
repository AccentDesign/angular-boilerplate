import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { AuthRepository } from '@modules/auth/shared/auth.repository';
import { LoginRequest } from '@modules/auth/shared/interfaces/login-request';
import { LoginResponse } from '@modules/auth/shared/interfaces/login-response';
import { RegisterRequest } from '@modules/auth/shared/interfaces/register-request';
import { ResetPasswordRequest } from '@modules/auth/shared/interfaces/reset-password-request';
import { UpdateUserRequest } from '@modules/auth/shared/interfaces/update-user-request';
import { User } from '@modules/auth/shared/interfaces/user';
import { catchError, finalize, first, map, Observable, of, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authRepository = inject(AuthRepository);
  private http = inject(HttpClient);

  private baseURL = environment.apiHost;

  constructor() {
    if (this.authRepository.accessToken() && !this.authRepository.currentUser()) {
      this.getUser().pipe(first()).subscribe({
        error: (err) => console.error(err),
      });
    }
  }

  forgotPassword(email: string): Observable<null> {
    const url = `${this.baseURL}/auth/forgot-password`;
    return this.http.post<null>(url, { email });
  }

  getUser(): Observable<User> {
    const url = `${this.baseURL}/users/me`;
    return this.http.get<User>(url).pipe(
      tap(user => this.authRepository.setUser(user))
    );
  }

  logIn({ username, password }: LoginRequest): Observable<LoginResponse> {
    const url = `${this.baseURL}/auth/token/login`;
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    return this.http.post<LoginResponse>(url, data).pipe(
      tap(data => this.authRepository.setAccessToken(data.access_token)),
      switchMap((original) => {
        return this.getUser().pipe(
          switchMap(() => of(original))
        );
      })
    );
  }

  logOut(): Observable<null> {
    const url = `${this.baseURL}/auth/token/logout`;
    return this.http.post<null>(url, {}).pipe(
      finalize(() => this.authRepository.clear()),
      map(() => null),
      catchError(() => of(null))
    );
  }

  register(request: RegisterRequest): Observable<User> {
    const url = `${this.baseURL}/auth/register`;
    return this.http.post<User>(url, request);
  }

  resetPassword(request: ResetPasswordRequest): Observable<null> {
    const url = `${this.baseURL}/auth/reset-password`;
    return this.http.post<null>(url, request);
  }

  updateUser(request: UpdateUserRequest): Observable<User> {
    const url = `${this.baseURL}/users/me`;
    return this.http.patch<User>(url, request).pipe(
      tap(user => this.authRepository.setUser(user))
    );
  }

  verifyRequest(): Observable<null> {
    const user = this.authRepository.currentUser();
    if (user === null) {
      return throwError(() => new Error('no current user'));
    }
    const url = `${this.baseURL}/auth/verify-request`;
    const request = { email: user.email };
    return this.http.post<null>(url, request);
  }

  verify(token: string): Observable<User> {
    const url = `${this.baseURL}/auth/verify`;
    return this.http.post<User>(url, { token }).pipe(
      tap(user => this.authRepository.setUser(user))
    );
  }
}
