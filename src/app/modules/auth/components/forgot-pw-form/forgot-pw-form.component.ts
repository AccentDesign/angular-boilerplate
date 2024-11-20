import { HttpErrorResponse } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "@modules/auth/shared/auth.service";
import { FormErrorComponent } from "@modules/shared/components/form-error/form-error.component";
import { MessageComponent } from "@modules/shared/components/message/message.component";
import { FormatHttpError } from "@modules/shared/utils/error";
import { finalize, first } from "rxjs";

@Component({
    selector: "app-forgot-pw-form",
    imports: [
        MessageComponent,
        ReactiveFormsModule,
        FormErrorComponent
    ],
    templateUrl: "./forgot-pw-form.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPwFormComponent {
  errors = signal<string[]>([]);
  submitting = signal(false);
  submitted = signal(false);
  success = signal(false);

  form = new FormGroup({
    email: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    })
  });

  private authService = inject(AuthService);

  async submit(): Promise<void> {
    if (!this.form.valid) {
      this.submitted.set(true);
      return;
    }
    this.errors.set([]);
    this.submitting.set(true);
    this.success.set(false);
    const email = this.form.value.email ?? "";
    this.authService
      .forgotPassword(email)
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
