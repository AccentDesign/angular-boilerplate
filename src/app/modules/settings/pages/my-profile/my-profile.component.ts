import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRepository } from '@modules/auth/shared/auth.repository';
import { AuthService } from '@modules/auth/shared/auth.service';
import { UpdateUserRequest } from '@modules/auth/shared/interfaces/update-user-request';
import { EmailVerificationFormComponent } from '@modules/settings/components/email-verification-form/email-verification-form.component';
import { ErrorMessagesComponent } from '@modules/shared/components/error-messages/error-messages.component';
import { MessageComponent } from '@modules/shared/components/message/message.component';
import { FormFieldErrorDirective } from '@modules/shared/directives/form-field-error.directive';
import { ErrorMessageService } from '@modules/shared/services/error-message.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective, HlmInputErrorDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { HlmH4Directive } from '@spartan-ng/ui-typography-helm';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [
    EmailVerificationFormComponent,
    ErrorMessagesComponent,
    ReactiveFormsModule,
    FormFieldErrorDirective,
    MessageComponent,
    HlmLabelDirective,
    HlmInputDirective,
    HlmInputErrorDirective,
    HlmButtonDirective,
    HlmSeparatorDirective,
    HlmH4Directive,
  ],
  templateUrl: './my-profile.component.html',
})
export default class MyProfileComponent {
  form = new FormGroup({
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
  });
  loading = signal<boolean>(false);
  success = signal<boolean>(false);
  private authRepository = inject(AuthRepository);
  private authService = inject(AuthService);
  private errorService = inject(ErrorMessageService);
  private _ = effect(() => {
    const user = this.authRepository.currentUser();
    if (user) {
      this.form.setValue({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    } else {
      this.form.reset();
    }
  });

  submit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.success.set(false);
    const data = {
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      email: this.form.value.email,
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
      this.errorService.publishError('myProfile', error);
    } else {
      this.errorService.publishMessages('myProfile', ['Something went wrong please try again.']);
      console.error(error);
    }
  }

  handleSubmitFinish(): void {
    this.loading.set(false);
  }
}
