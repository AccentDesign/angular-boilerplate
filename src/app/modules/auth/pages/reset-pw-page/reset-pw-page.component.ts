import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthPaths } from '@modules/auth/shared/auth-routes';
import { AuthService } from '@modules/auth/shared/auth.service';
import { ResetPasswordRequest } from '@modules/auth/shared/interfaces/reset-password-request';
import { ErrorMessagesComponent } from '@modules/shared/components/error-messages/error-messages.component';
import { LogoComponent } from '@modules/shared/components/logo/logo.component';
import { MessageComponent } from '@modules/shared/components/message/message.component';
import { FormFieldErrorDirective } from '@modules/shared/directives/form-field-error.directive';
import { ErrorMessageService } from '@modules/shared/services/error-message.service';
import { passwordsMatchValidator } from '@modules/shared/validators/passwords-match';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective, HlmInputErrorDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmH2Directive, HlmPDirective } from '@spartan-ng/ui-typography-helm';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'app-reset-pw-page',
  standalone: true,
  imports: [
    ErrorMessagesComponent,
    LogoComponent,
    ReactiveFormsModule,
    FormFieldErrorDirective,
    MessageComponent,
    HlmLabelDirective,
    HlmInputDirective,
    HlmInputErrorDirective,
    HlmButtonDirective,
    HlmH2Directive,
    HlmPDirective,
  ],
  templateUrl: './reset-pw-page.component.html',
})
export default class ResetPwPageComponent {
  token = input.required<string>();
  form = new FormGroup(
    {
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),
      password_confirm: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    { validators: passwordsMatchValidator },
  );
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
      token: this.token(),
    } as ResetPasswordRequest;
    this.authService
      .resetPassword(data)
      .pipe(
        first(),
        finalize(() => this.handleSubmitFinish()),
      )
      .subscribe({
        next: () => this.handleSubmitSuccess(),
        error: (error) => this.handleSubmitError(error),
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
