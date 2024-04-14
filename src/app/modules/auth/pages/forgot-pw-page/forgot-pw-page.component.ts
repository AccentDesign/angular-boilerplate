import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/shared/auth.service';
import { ErrorMessagesComponent } from '@modules/shared/components/error-messages/error-messages.component';
import { LogoComponent } from '@modules/shared/components/logo/logo.component';
import { MessageComponent } from '@modules/shared/components/message/message.component';
import { FieldErrorDirective } from '@modules/shared/directives/field-error.directive';
import { ErrorMessageService } from '@modules/shared/services/error-message.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective, HlmInputErrorDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmH2Directive } from '@spartan-ng/ui-typography-helm';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'app-forgot-pw-page',
  standalone: true,
  imports: [
    ErrorMessagesComponent,
    LogoComponent,
    ReactiveFormsModule,
    FieldErrorDirective,
    MessageComponent,
    HlmInputErrorDirective,
    HlmInputDirective,
    HlmLabelDirective,
    HlmButtonDirective,
    HlmH2Directive,
  ],
  templateUrl: './forgot-pw-page.component.html',
})
export default class ForgotPwPageComponent {
  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });
  loading = signal<boolean>(false);
  success = signal<boolean>(false);
  private authService = inject(AuthService);
  private errorService = inject(ErrorMessageService);

  submit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.success.set(false);
    const email = this.form.value.email ?? '';
    this.authService
      .forgotPassword(email)
      .pipe(
        first(),
        finalize(() => this.handleSubmitFinish()),
      )
      .subscribe({
        next: () => this.handleSubmitSuccess(),
        error: (error) => this.handleSubmitError(error),
      });
  }

  handleSubmitFinish(): void {
    this.loading.set(false);
  }

  handleSubmitSuccess(): void {
    this.success.set(true);
  }

  handleSubmitError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      this.errorService.publishError('forgotPw', error);
    } else {
      this.errorService.publishMessages('forgotPw', ['Something went wrong please try again.']);
      console.error(error);
    }
  }
}
