import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRepository } from '@modules/auth/shared/auth.repository';
import { AuthService } from '@modules/auth/shared/auth.service';
import { ErrorMessagesComponent } from '@modules/shared/components/error-messages/error-messages.component';
import { FormErrorsComponent } from '@modules/shared/components/form-errors/form-errors.component';
import { MessageOkComponent } from '@modules/shared/components/message-ok/message-ok.component';
import { ErrorMessageService } from '@modules/shared/services/error-message.service';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'app-email-verification-form',
  standalone: true,
  imports: [
    CommonModule,
    MessageOkComponent,
    ReactiveFormsModule,
    FormErrorsComponent,
    ErrorMessagesComponent
  ],
  templateUrl: './email-verification-form.component.html'
})
export class EmailVerificationFormComponent {
  form = new FormGroup({
    token: new FormControl('', [
      Validators.required
    ]),
  });
  loading = false;
  success = false;
  requested = false;

  constructor(
    public authRepository: AuthRepository,
    private authService: AuthService,
    private errorService: ErrorMessageService,
  ) {
  }

  request(event: Event | MouseEvent): void {
    event.stopPropagation();
    this.requested = false;
    this.authService.verifyRequest().pipe(
      first()
    ).subscribe({
      next: () => this.handleRequestSuccess(),
      error: (error) => this.handleBothError(error)
    });
  }

  submit(): void {
    if (!this.form.valid) return;
    this.loading = true;
    this.success = false;
    this.authService.verify(this.form.value.token ?? '').pipe(
      first(),
      finalize(() => this.handleSubmitFinish())
    ).subscribe({
      next: () => this.handleSubmitSuccess(),
      error: (error) => this.handleBothError(error)
    });
  }

  handleRequestSuccess(): void {
    this.requested = true;
  }

  handleSubmitSuccess(): void {
    this.success = true;
  }

  handleBothError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      this.errorService.publishError('verifyEmail', error);
    } else {
      this.errorService.publishMessages('verifyEmail', ['Something went wrong please try again.']);
      console.error(error);
    }
  }

  handleSubmitFinish(): void {
    this.loading = false;
  }
}
