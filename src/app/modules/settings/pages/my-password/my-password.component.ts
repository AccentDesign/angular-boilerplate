import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/shared/auth.service';
import { UpdateUserRequest } from '@modules/auth/shared/interfaces/update-user-request';
import { ErrorMessagesComponent } from '@modules/shared/components/error-messages/error-messages.component';
import { MessageComponent } from '@modules/shared/components/message/message.component';
import { FormFieldErrorDirective } from '@modules/shared/directives/form-field-error.directive';
import { ErrorMessageService } from '@modules/shared/services/error-message.service';
import { passwordsMatchValidator } from '@modules/shared/validators/passwords-match';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective, HlmInputErrorDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmH4Directive } from '@spartan-ng/ui-typography-helm';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'app-my-password',
  standalone: true,
  imports: [
    ErrorMessagesComponent,
    FormsModule,
    ReactiveFormsModule,
    FormFieldErrorDirective,
    MessageComponent,
    HlmLabelDirective,
    HlmInputDirective,
    HlmInputErrorDirective,
    HlmButtonDirective,
    HlmH4Directive,
  ],
  templateUrl: './my-password.component.html',
})
export default class MyPasswordComponent {
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
    this.loading.set(true);
    this.success.set(false);
    const data = {
      password: this.form.value.password,
    } as UpdateUserRequest;
    this.authService
      .updateUser(data)
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
      this.errorService.publishError('myPw', error);
    } else {
      this.errorService.publishMessages('myPw', ['Something went wrong please try again.']);
      console.error(error);
    }
  }

  handleSubmitFinish(): void {
    this.loading.set(false);
    this.resetForm();
  }
}
