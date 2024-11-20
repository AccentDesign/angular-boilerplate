import { HttpErrorResponse } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, inject, input, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthPaths } from "@modules/auth/shared/auth-routes";
import { AuthService } from "@modules/auth/shared/auth.service";
import { ResetPasswordRequest } from "@modules/auth/shared/interfaces/reset-password-request";
import { FormErrorComponent } from "@modules/shared/components/form-error/form-error.component";
import { MessageComponent } from "@modules/shared/components/message/message.component";
import { FormatHttpError } from "@modules/shared/utils/error";
import { passwordsMatchValidator } from "@modules/shared/validators/passwords-match";
import { finalize, first } from "rxjs";

@Component({
    selector: "app-reset-pw-form",
    imports: [
        MessageComponent,
        ReactiveFormsModule,
        FormErrorComponent
    ],
    templateUrl: "./reset-pw-form.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPwFormComponent {
  protected readonly AuthPaths = AuthPaths;

  errors = signal<string[]>([]);
  submitting = signal<boolean>(false);
  success = signal<boolean>(false);
  token = input.required<string>();

  form = new FormGroup(
    {
      password: new FormControl("", {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)]
      }),
      password_confirm: new FormControl("", {
        nonNullable: true,
        validators: [Validators.required]
      })
    },
    { validators: passwordsMatchValidator }
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
      token: this.token()
    } as ResetPasswordRequest;
    this.authService
      .resetPassword(data)
      .pipe(
        first(),
        finalize(() => this.handleFinish())
      )
      .subscribe({
        next: () => this.handleSuccess(),
        error: (error) => this.handleError(error)
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
      this.errors.set(["Something went wrong please try again."]);
      console.error(error);
    }
  }
}
