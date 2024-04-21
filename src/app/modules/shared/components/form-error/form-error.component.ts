import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { HlmInputErrorDirective } from '@spartan-ng/ui-input-helm';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [HlmInputErrorDirective],
  template: `
    @if (show()) {
      @if (errors(); as err) {
        <ul hlmInputError>
          @if (err['required']) {
            <li>This field is required</li>
          }
          @if (err['email']) {
            <li>Please enter a valid email address</li>
          }
          @if (err['minlength']?.['requiredLength']; as val) {
            <li>Must be at least {{ val }} characters long</li>
          }
          @if (err['passwordsMatch']) {
            <li>The passwords do not match.</li>
          }
        </ul>
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent {
  errors = input.required<ValidationErrors | null>();
  show = input.required<boolean>();
}
