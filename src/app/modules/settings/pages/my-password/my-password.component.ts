import { Component } from '@angular/core';
import { PasswordFormComponent } from '@modules/settings/components/password-form/password-form.component';
import { HlmH4Directive } from '@spartan-ng/ui-typography-helm';

@Component({
  selector: 'app-my-password',
  standalone: true,
  imports: [HlmH4Directive, PasswordFormComponent],
  templateUrl: './my-password.component.html',
})
export default class MyPasswordComponent {}
