import { Component, input } from '@angular/core';
import { ResetPwFormComponent } from '@modules/auth/components/reset-pw-form/reset-pw-form.component';
import { LogoComponent } from '@modules/shared/components/logo/logo.component';

@Component({
  selector: 'app-reset-pw-page',
  standalone: true,
  imports: [LogoComponent, ResetPwFormComponent],
  templateUrl: './reset-pw-page.component.html',
})
export default class ResetPwPageComponent {
  token = input.required<string>();
}
