import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/shared/auth.service';
import { UpdateUserRequest } from '@modules/auth/shared/interfaces/update-user-request';
import { MessageComponent } from '@modules/shared/components/message/message.component';
import { FieldErrorDirective } from '@modules/shared/directives/field-error.directive';
import { FormatHttpError } from '@modules/shared/utils/error';
import { passwordsMatchValidator } from '@modules/shared/validators/passwords-match';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective, HlmInputErrorDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'app-password-form',
  standalone: true,
  imports: [
    FieldErrorDirective,
    HlmButtonDirective,
    HlmInputDirective,
    HlmInputErrorDirective,
    HlmLabelDirective,
    MessageComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './password-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFormComponent {
  errors = signal<string[]>([]);
  submitting = signal<boolean>(false);
  success = signal<boolean>(false);

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

  private authService = inject(AuthService);

  async submit(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.errors.set([]);
    this.submitting.set(true);
    this.success.set(false);
    const data = {
      password: this.form.value.password,
    } as UpdateUserRequest;
    this.authService
      .updateUser(data)
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
    this.form.reset();
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
