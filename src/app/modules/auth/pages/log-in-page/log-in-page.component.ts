import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthPaths } from '@modules/auth/shared/auth-routes';
import { AuthRepository } from '@modules/auth/shared/auth.repository';
import { AuthService } from '@modules/auth/shared/auth.service';
import { LoginRequest } from '@modules/auth/shared/interfaces/login-request';
import { DashboardPaths } from '@modules/dashboard/shared/dashboard-routes';
import { ErrorMessagesComponent } from '@modules/shared/components/error-messages/error-messages.component';
import { LogoComponent } from '@modules/shared/components/logo/logo.component';
import { FieldErrorDirective } from '@modules/shared/directives/field-error.directive';
import { ErrorMessageService } from '@modules/shared/services/error-message.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective, HlmInputErrorDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmH2Directive } from '@spartan-ng/ui-typography-helm';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'app-log-in-page',
  standalone: true,
  imports: [
    ErrorMessagesComponent,
    LogoComponent,
    ReactiveFormsModule,
    FieldErrorDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
    HlmInputErrorDirective,
    HlmH2Directive,
  ],
  templateUrl: './log-in-page.component.html',
})
export default class LogInPageComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });
  loading = signal<boolean>(false);
  protected readonly AuthPaths = AuthPaths;
  private authRepository = inject(AuthRepository);
  private authService = inject(AuthService);
  private errorService = inject(ErrorMessageService);
  private router = inject(Router);

  ngOnInit(): void {
    this.authRepository.clear();
  }

  logIn(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const data = {
      username: this.form.value.email,
      password: this.form.value.password,
    } as LoginRequest;
    this.authService
      .logIn(data)
      .pipe(
        first(),
        finalize(() => this.handleLogInFinish()),
      )
      .subscribe({
        next: () => this.handleLogInSuccess(),
        error: (error) => this.handleLogInError(error),
      });
  }

  handleLogInFinish(): void {
    this.loading.set(false);
  }

  async handleLogInSuccess(): Promise<void> {
    await this.router.navigateByUrl(DashboardPaths.dashboard);
  }

  handleLogInError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      this.errorService.publishError('logIn', error);
    } else {
      this.errorService.publishMessages('logIn', ['Something went wrong please try again.']);
      console.error(error);
    }
  }
}
