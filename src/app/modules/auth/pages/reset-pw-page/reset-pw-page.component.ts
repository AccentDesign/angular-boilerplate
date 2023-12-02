import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthPaths } from '@modules/auth/shared/auth-routes';
import { AuthService } from '@modules/auth/shared/auth.service';
import { ResetPasswordRequest } from '@modules/auth/shared/interfaces/reset-password-request';
import { ErrorMessagesComponent } from '@modules/shared/components/error-messages/error-messages.component';
import { LogoComponent } from '@modules/shared/components/logo/logo.component';
import { AlertDirective } from '@modules/shared/directives/alert.directive';
import { FormFieldErrorDirective } from '@modules/shared/directives/form-field-error.directive';
import { ErrorMessageService } from '@modules/shared/services/error-message.service';
import { passwordsMatchValidator } from '@modules/shared/validators/passwords-match';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'app-reset-pw-page',
  standalone: true,
  imports: [
    AlertDirective,
    CommonModule,
    ErrorMessagesComponent,
    LogoComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormFieldErrorDirective
  ],
  templateUrl: './reset-pw-page.component.html'
})
export default class ResetPwPageComponent {
  @Input({ required: true }) token!: string;
  form = new FormGroup({
    password: new FormControl('', {
      nonNullable: true, validators: [
        Validators.required,
        Validators.minLength(6)
      ]
    }),
    password_confirm: new FormControl('', {
      nonNullable: true, validators: [
        Validators.required
      ]
    }),
  }, { validators: passwordsMatchValidator });
  loading = signal<boolean>(false);
  success = signal<boolean>(false);
  protected readonly AuthPaths = AuthPaths;
  private authService = inject(AuthService);
  private errorService = inject(ErrorMessageService);

  resetForm() {
    this.form.reset();
  }

  submit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.success.set(false);
    const data = {
      password: this.form.value.password,
      token: this.token
    } as ResetPasswordRequest;
    this.authService.resetPassword(data).pipe(
      first(),
      finalize(() => this.handleSubmitFinish())
    ).subscribe({
      next: () => this.handleSubmitSuccess(),
      error: (error) => this.handleSubmitError(error)
    });
  }

  handleSubmitSuccess(): void {
    this.success.set(true);
  }

  handleSubmitError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      this.errorService.publishError('resetPw', error);
    } else {
      this.errorService.publishMessages('resetPw', ['Something went wrong please try again.']);
      console.error(error);
    }
  }

  handleSubmitFinish(): void {
    this.loading.set(false);
    this.resetForm();
  }
}
