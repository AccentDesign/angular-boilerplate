import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRepository } from '@modules/auth/shared/auth.repository';
import { AuthService } from '@modules/auth/shared/auth.service';
import { UpdateUserRequest } from '@modules/auth/shared/interfaces/update-user-request';
import { FormErrorComponent } from '@modules/shared/components/form-error/form-error.component';
import { MessageComponent } from '@modules/shared/components/message/message.component';
import { FormatHttpError } from '@modules/shared/utils/error';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    HlmButtonDirective,
    HlmInputDirective,
    HlmLabelDirective,
    ReactiveFormsModule,
    MessageComponent,
    FormErrorComponent,
  ],
  templateUrl: './profile-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFormComponent {
  errors = signal<string[]>([]);
  submitting = signal<boolean>(false);
  success = signal<boolean>(false);

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

  private authRepository = inject(AuthRepository);
  private authService = inject(AuthService);
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

  async submit(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.errors.set([]);
    this.submitting.set(true);
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
