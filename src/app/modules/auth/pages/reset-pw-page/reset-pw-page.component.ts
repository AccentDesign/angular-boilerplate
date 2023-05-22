import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@modules/auth/shared/auth.service';
import { ResetPasswordRequest } from '@modules/auth/shared/interfaces/reset-password-request';
import { ErrorMessagesComponent } from '@modules/shared/components/error-messages/error-messages.component';
import { FormErrorsComponent } from '@modules/shared/components/form-errors/form-errors.component';
import { MessageErrorComponent } from '@modules/shared/components/message-error/message-error.component';
import { MessageOkComponent } from '@modules/shared/components/message-ok/message-ok.component';
import { ErrorMessageService } from '@modules/shared/services/error-message.service';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'app-reset-pw-page',
  standalone: true,
  imports: [CommonModule, FormErrorsComponent, MessageOkComponent, NgOptimizedImage, ReactiveFormsModule, MessageErrorComponent, ErrorMessagesComponent],
  templateUrl: './reset-pw-page.component.html'
})
export class ResetPwPageComponent {
  @ViewChild('ngForm') ngForm!: NgForm;

  form = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    confirm_password: new FormControl('', [
      Validators.required
    ]),
  });
  loading = false;
  success = false;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  token = this.route.snapshot.paramMap.get('token')!;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private errorService: ErrorMessageService,
  ) {
  }

  resetForm() {
    this.form.reset();
    this.ngForm.resetForm();
  }

  submit(): void {
    if (!this.form.valid) return;
    this.success = false;
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
    this.success = true;
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
    this.loading = false;
    this.resetForm();
  }
}
