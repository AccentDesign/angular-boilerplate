import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRepository } from '@modules/auth/shared/auth.repository';
import { AuthService } from '@modules/auth/shared/auth.service';
import { UpdateUserRequest } from '@modules/auth/shared/interfaces/update-user-request';
import {
  EmailVerificationFormComponent
} from '@modules/settings/components/email-verification-form/email-verification-form.component';
import { Unsubscribe } from '@modules/shared/abstract/unsubscribe';
import { ErrorMessagesComponent } from '@modules/shared/components/error-messages/error-messages.component';
import { FormErrorsComponent } from '@modules/shared/components/form-errors/form-errors.component';
import { MessageOkComponent } from '@modules/shared/components/message-ok/message-ok.component';
import { ErrorMessageService } from '@modules/shared/services/error-message.service';
import { finalize, first, takeUntil } from 'rxjs';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormErrorsComponent,
    MessageOkComponent,
    EmailVerificationFormComponent,
    ErrorMessagesComponent
  ],
  templateUrl: './my-profile.component.html'
})
export class MyProfileComponent extends Unsubscribe implements OnInit {
  form = new FormGroup({
    first_name: new FormControl('', [
      Validators.required
    ]),
    last_name: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
  });
  loading = signal<boolean>(false);
  success = signal<boolean>(false);

  constructor(
    private authRepository: AuthRepository,
    private authService: AuthService,
    private errorService: ErrorMessageService
  ) {
    super();
  }

  ngOnInit() {
    this.authRepository.user$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(user => {
      if (user) {
        this.form.setValue({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        });
      } else {
        this.form.reset();
      }
    });
  }

  submit(): void {
    if (!this.form.valid) return;
    this.loading.set(true);
    this.success.set(false);
    const data = {
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      email: this.form.value.email,
    } as UpdateUserRequest;
    this.authService.updateUser(data).pipe(
      first(),
      finalize(() => this.handleSubmitFinish())
    ).subscribe({
      next: () => this.handleSubmitSuccess(),
      error: (error) => this.handleSubmitError(error)
    });
  }

  handleSubmitSuccess(): void {
    this.success.set(true);
  }

  handleSubmitError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      this.errorService.publishError('myProfile', error);
    } else {
      this.errorService.publishMessages('myProfile', ['Something went wrong please try again.']);
      console.error(error);
    }
  }

  handleSubmitFinish(): void {
    this.loading.set(false);
  }
}
