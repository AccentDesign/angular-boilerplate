import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthPaths } from '@modules/auth/shared/auth-routes';
import { AuthService } from '@modules/auth/shared/auth.service';
import { RegisterRequest } from '@modules/auth/shared/interfaces/register-request';
import { ErrorMessagesComponent } from '@modules/shared/components/error-messages/error-messages.component';
import { LogoComponent } from '@modules/shared/components/logo/logo.component';
import { MessageComponent } from '@modules/shared/components/message/message.component';
import { FieldErrorDirective } from '@modules/shared/directives/field-error.directive';
import { ErrorMessageService } from '@modules/shared/services/error-message.service';
import { passwordsMatchValidator } from '@modules/shared/validators/passwords-match';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective, HlmInputErrorDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmH2Directive, HlmPDirective } from '@spartan-ng/ui-typography-helm';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    ErrorMessagesComponent,
    LogoComponent,
    ReactiveFormsModule,
    FieldErrorDirective,
    MessageComponent,
    HlmLabelDirective,
    HlmInputDirective,
    HlmInputErrorDirective,
    HlmButtonDirective,
    HlmH2Directive,
    HlmPDirective,
  ],
  templateUrl: './register-page.component.html',
})
export default class RegisterPageComponent {
  form = new FormGroup(
    {
      first_name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      last_name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
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

  register(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const data = {
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      email: this.form.value.email,
      password: this.form.value.password,
    } as RegisterRequest;
    this.authService
      .register(data)
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
      this.errorService.publishError('register', error);
    } else {
      this.errorService.publishMessages('register', ['Something went wrong please try again.']);
      console.error(error);
    }
  }

  handleSubmitFinish(): void {
    this.loading.set(false);
  }
}
