import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/shared/auth.service';
import { MessageComponent } from '@modules/shared/components/message/message.component';
import { FieldErrorDirective } from '@modules/shared/directives/field-error.directive';
import { FormatHttpError } from '@modules/shared/utils/error';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective, HlmInputErrorDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'app-forgot-pw-form',
  standalone: true,
  imports: [
    MessageComponent,
    FieldErrorDirective,
    HlmButtonDirective,
    HlmInputDirective,
    HlmInputErrorDirective,
    HlmLabelDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './forgot-pw-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPwFormComponent {
  errors = signal<string[]>([]);
  submitting = signal<boolean>(false);
  success = signal<boolean>(false);

  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  private authService = inject(AuthService);

  async submit(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.errors.set([]);
    this.submitting.set(true);
    this.success.set(false);
    const email = this.form.value.email ?? '';
    this.authService
      .forgotPassword(email)
      .pipe(
        first(),
        finalize(() => this.handleFinish()),
      )
      .subscribe({
        next: () => this.handleSuccess(),
        error: (error) => this.handleError(error),
      });
  }

  private async handleSuccess(): Promise<void> {
    this.success.set(true);
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
