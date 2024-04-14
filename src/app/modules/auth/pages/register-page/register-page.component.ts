import { Component } from '@angular/core';
import { RegisterFormComponent } from '@modules/auth/components/register-form/register-form.component';
import { LogoComponent } from '@modules/shared/components/logo/logo.component';
import { HlmH2Directive } from '@spartan-ng/ui-typography-helm';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [LogoComponent, HlmH2Directive, RegisterFormComponent],
  templateUrl: './register-page.component.html',
})
export default class RegisterPageComponent {}
