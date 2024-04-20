import { Component } from '@angular/core';
import { RegisterFormComponent } from '@modules/auth/components/register-form/register-form.component';
import { LogoComponent } from '@modules/shared/components/logo/logo.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [LogoComponent, RegisterFormComponent],
  templateUrl: './register-page.component.html',
})
export default class RegisterPageComponent {}
