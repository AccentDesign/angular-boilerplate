import { Component, inject, OnInit } from '@angular/core';
import { LoginFormComponent } from '@modules/auth/components/login-form/login-form.component';
import { AuthPaths } from '@modules/auth/shared/auth-routes';
import { AuthRepository } from '@modules/auth/shared/auth.repository';
import { LogoComponent } from '@modules/shared/components/logo/logo.component';

@Component({
  selector: 'app-log-in-page',
  standalone: true,
  imports: [LogoComponent, LoginFormComponent],
  templateUrl: './log-in-page.component.html',
})
export default class LogInPageComponent implements OnInit {
  protected readonly AuthPaths = AuthPaths;
  private authRepository = inject(AuthRepository);

  ngOnInit(): void {
    this.authRepository.clear();
  }
}
