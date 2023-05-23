import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRepository } from '@modules/auth/shared/auth.repository';
import { AuthService } from '@modules/auth/shared/auth.service';
import { LoginRequest } from '@modules/auth/shared/interfaces/login-request';
import { ErrorMessagesComponent } from '@modules/shared/components/error-messages/error-messages.component';
import { FormErrorsComponent } from '@modules/shared/components/form-errors/form-errors.component';
import { MessageErrorComponent } from '@modules/shared/components/message-error/message-error.component';
import { ErrorMessageService } from '@modules/shared/services/error-message.service';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'app-log-in-page',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    FormErrorsComponent,
    MessageErrorComponent,
    ErrorMessagesComponent
  ],
  templateUrl: './log-in-page.component.html'
})
export class LogInPageComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });
  loading = signal<boolean>(false);

  constructor(
    private authRepository: AuthRepository,
    private authService: AuthService,
    private errorService: ErrorMessageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authRepository.clear();
  }

  logIn(): void {
    if (!this.form.valid) return;
    this.loading.set(true);
    const data = {
      username: this.form.value.email,
      password: this.form.value.password
    } as LoginRequest;
    this.authService.logIn(data).pipe(
      first(),
      finalize(() => this.handleLogInFinish())
    ).subscribe({
      next: () => this.handleLogInSuccess(),
      error: (error) => this.handleLogInError(error),
    });
  }

  handleLogInFinish(): void {
    this.loading.set(false);
  }

  async handleLogInSuccess(): Promise<void> {
    await this.router.navigateByUrl('/dashboard');
  }

  handleLogInError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      this.errorService.publishError('logIn', error);
    } else {
      this.errorService.publishMessages('logIn', ['Something went wrong please try again.']);
      console.error(error);
    }
  }
}
