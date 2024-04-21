import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRepository } from '@modules/auth/shared/auth.repository';
import { AuthService } from '@modules/auth/shared/auth.service';
import { FormErrorComponent } from '@modules/shared/components/form-error/form-error.component';
import { MessageComponent } from '@modules/shared/components/message/message.component';
import { FormatHttpError } from '@modules/shared/utils/error';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'app-email-verification-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MessageComponent,
    HlmButtonDirective,
    HlmLabelDirective,
    HlmInputDirective,
    FormErrorComponent,
  ],
  templateUrl: './email-verification-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailVerificationFormComponent {
  errors = signal<string[]>([]);
  requested = signal<boolean>(false);
  submitting = signal<boolean>(false);
  verified = signal<boolean>(false);

  authRepository = inject(AuthRepository);
  form = new FormGroup({
    token: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  private authService = inject(AuthService);

  async request(event: Event | MouseEvent): Promise<void> {
    event.stopPropagation();
    this.errors.set([]);
    this.submitting.set(true);
    this.requested.set(false);
    this.authService
      .verifyRequest()
      .pipe(
        first(),
        finalize(() => this.handleFinish()),
      )
      .subscribe({
        next: () => this.handleRequestSuccess(),
        error: (error) => this.handleError(error),
      });
  }

  async verify(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.errors.set([]);
    this.submitting.set(true);
    this.verified.set(false);
    this.authService
      .verify(this.form.value.token ?? '')
      .pipe(
        first(),
        finalize(() => this.handleFinish()),
      )
      .subscribe({
        next: () => this.handleVerifySuccess(),
        error: (error) => this.handleError(error),
      });
  }

  private async handleRequestSuccess(): Promise<void> {
    this.requested.set(true);
  }

  private async handleVerifySuccess(): Promise<void> {
    this.verified.set(true);
  }

  private async handleFinish(): Promise<void> {
    this.submitting.set(false);
  }

  private async handleError(error: Error | HttpErrorResponse): Promise<void> {
    if (error instanceof HttpErrorResponse) {
      this.errors.set(FormatHttpError(error));
    } else {
      this.errors.set(['Something went wrong please try again.']);
      console.error(error);
    }
  }
}
