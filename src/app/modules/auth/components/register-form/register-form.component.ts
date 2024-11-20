import { HttpErrorResponse } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthPaths } from "@modules/auth/shared/auth-routes";
import { AuthService } from "@modules/auth/shared/auth.service";
import { RegisterRequest } from "@modules/auth/shared/interfaces/register-request";
import { FormErrorComponent } from "@modules/shared/components/form-error/form-error.component";
import { MessageComponent } from "@modules/shared/components/message/message.component";
import { FormatHttpError } from "@modules/shared/utils/error";
import { passwordsMatchValidator } from "@modules/shared/validators/passwords-match";
import { finalize, first } from "rxjs";

@Component({
    selector: "app-register-form",
    imports: [
        ReactiveFormsModule,
        MessageComponent,
        FormErrorComponent
    ],
    templateUrl: "./register-form.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
  protected readonly AuthPaths = AuthPaths;

  errors = signal<string[]>([]);
  submitting = signal(false);
  submitted = signal(false);
  success = signal(false);

  form = new FormGroup(
    {
      first_name: new FormControl("", {
        nonNullable: true,
        validators: [Validators.required]
      }),
      last_name: new FormControl("", {
        nonNullable: true,
        validators: [Validators.required]
      }),
      email: new FormControl("", {
        nonNullable: true,
        validators: [Validators.required, Validators.email]
      }),
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
      this.submitted.set(true);
      return;
    }
    this.errors.set([]);
    this.submitting.set(true);
    this.success.set(false);
    const data = {
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      email: this.form.value.email,
      password: this.form.value.password
    } as RegisterRequest;
    this.authService
      .register(data)
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
