import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthRepository } from '@modules/auth/shared/auth.repository';
import { AuthService } from '@modules/auth/shared/auth.service';
import { MessageComponent } from '@modules/shared/components/message/message.component';
import { ErrorMessagesComponent } from '@modules/shared/components/error-messages/error-messages.component';
import { FormFieldErrorDirective } from '@modules/shared/directives/form-field-error.directive';
import { ErrorMessageService } from '@modules/shared/services/error-message.service';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'app-email-verification-form',
  standalone: true,
  imports: [
    CommonModule,
    ErrorMessagesComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormFieldErrorDirective,
    MessageComponent,
  ],
  templateUrl: './email-verification-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailVerificationFormComponent {
  authRepository = inject(AuthRepository);
  form = new FormGroup({
    token: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  loading = signal<boolean>(false);
  success = signal<boolean>(false);
  requested = signal<boolean>(false);
  private authService = inject(AuthService);
  private errorService = inject(ErrorMessageService);

  request(event: Event | MouseEvent): void {
    event.stopPropagation();
    this.requested.set(false);
    this.authService
      .verifyRequest()
      .pipe(first())
      .subscribe({
        next: () => this.handleRequestSuccess(),
        error: (error) => this.handleBothError(error),
      });
  }

  submit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.success.set(false);
    this.authService
      .verify(this.form.value.token ?? '')
      .pipe(
        first(),
        finalize(() => this.handleSubmitFinish()),
      )
      .subscribe({
        next: () => this.handleSubmitSuccess(),
        error: (error) => this.handleBothError(error),
      });
  }

  handleRequestSuccess(): void {
    this.requested.set(true);
  }

  handleSubmitSuccess(): void {
    this.success.set(true);
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
    this.loading.set(false);
  }
}
