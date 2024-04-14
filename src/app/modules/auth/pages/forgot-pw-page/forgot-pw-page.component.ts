import { Component } from '@angular/core';
import { ForgotPwFormComponent } from '@modules/auth/components/forgot-pw-form/forgot-pw-form.component';
import { LogoComponent } from '@modules/shared/components/logo/logo.component';
import { HlmH2Directive } from '@spartan-ng/ui-typography-helm';

@Component({
  selector: 'app-forgot-pw-page',
  standalone: true,
  imports: [LogoComponent, HlmH2Directive, ForgotPwFormComponent],
  templateUrl: './forgot-pw-page.component.html',
})
export default class ForgotPwPageComponent {}
