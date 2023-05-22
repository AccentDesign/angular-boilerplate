import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/shared/auth.service';
import { ErrorMessagesComponent } from '@modules/shared/components/error-messages/error-messages.component';
import { FormErrorsComponent } from '@modules/shared/components/form-errors/form-errors.component';
import { MessageErrorComponent } from '@modules/shared/components/message-error/message-error.component';
import { MessageOkComponent } from '@modules/shared/components/message-ok/message-ok.component';
import { ErrorMessageService } from '@modules/shared/services/error-message.service';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'app-forgot-pw-page',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    FormErrorsComponent,
    MessageOkComponent,
    MessageErrorComponent,
    ErrorMessagesComponent
  ],
  templateUrl: './forgot-pw-page.component.html'
})
export class ForgotPwPageComponent {
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
  });
  loading = false;
  success = false;

  constructor(
    private authService: AuthService,
    private errorService: ErrorMessageService,
  ) {
  }

  submit(): void {
    if (!this.form.valid) return;
    this.loading = true;
    this.success = false;
    const email = this.form.value.email ?? '';
    this.authService.forgotPassword(email).pipe(
      first(),
      finalize(() => this.loading = false)
    ).subscribe({
      next: () => this.handleSubmitSuccess(),
      error: (error) => this.handleSubmitError(error),
    });
  }

  handleSubmitSuccess(): void {
    this.success = true;
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
