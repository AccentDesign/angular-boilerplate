import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthPaths } from '@modules/auth/shared/auth-routes';
import { ErrorMessagesComponent } from '@modules/shared/components/error-messages/error-messages.component';
import { LogoComponent } from '@modules/shared/components/logo/logo.component';
import { FormFieldErrorDirective } from '@modules/shared/directives/form-field-error.directive';

@Component({
  selector: 'app-error404-page',
  standalone: true,
  imports: [
    LogoComponent,
    MatButtonModule,
    ErrorMessagesComponent,
    FormFieldErrorDirective,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './error404-page.component.html',
})
export default class Error404PageComponent {
  protected readonly AuthPaths = AuthPaths;
}
