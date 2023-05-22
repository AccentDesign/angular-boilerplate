import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRepository } from '@modules/auth/shared/auth.repository';
import { AuthService } from '@modules/auth/shared/auth.service';
import { FormErrorsComponent } from '@modules/shared/components/form-errors/form-errors.component';
import { MessageOkComponent } from '@modules/shared/components/message-ok/message-ok.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-email-verification-form',
  standalone: true,
  imports: [CommonModule, MessageOkComponent, ReactiveFormsModule, FormErrorsComponent],
  templateUrl: './email-verification-form.component.html'
})
export class EmailVerificationFormComponent {
  form = new FormGroup({
    token: new FormControl('', [
      Validators.required
    ]),
  });
  loading = false;
  success = false;
  requested = false;

  constructor(
    public authRepository: AuthRepository,
    private authService: AuthService
  ) {
  }

  async requestToken(): Promise<void> {
    this.requested = false;
    try {
      await firstValueFrom(this.authService.verifyRequest());
      this.requested = true;
    } catch (error) {
      console.error(error);
    }
  }

  async submitToken(): Promise<void> {
    if (!this.form.valid) return;
    this.loading = true;
    this.success = false;
    try {
      await firstValueFrom(this.authService.verify(this.form.value.token ?? ''));
      this.success = true;
    } catch (error) {
      console.error(error)
    } finally {
      this.loading = false;
    }
  }
}
