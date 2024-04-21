import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthPaths } from '@modules/auth/shared/auth-routes';
import { AuthService } from '@modules/auth/shared/auth.service';
import { LoginRequest } from '@modules/auth/shared/interfaces/login-request';
import { DashboardPaths } from '@modules/dashboard/shared/dashboard-routes';
import { FormErrorComponent } from '@modules/shared/components/form-error/form-error.component';
import { MessageComponent } from '@modules/shared/components/message/message.component';
import { FormatHttpError } from '@modules/shared/utils/error';
import { HlmAlertDirective } from '@spartan-ng/ui-alert-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    HlmButtonDirective,
    HlmInputDirective,
    HlmLabelDirective,
    ReactiveFormsModule,
    HlmAlertDirective,
    MessageComponent,
    FormErrorComponent,
  ],
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  protected readonly AuthPaths = AuthPaths;

  errors = signal<string[]>([]);
  submitting = signal<boolean>(false);

  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  private authService = inject(AuthService);
  private router = inject(Router);

  async submit(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.errors.set([]);
    this.submitting.set(true);
    const data = {
      username: this.form.value.email,
      password: this.form.value.password,
    } as LoginRequest;
    this.authService
      .logIn(data)
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
    await this.router.navigateByUrl(DashboardPaths.dashboard);
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
