import { DestroyRef, Directive, ElementRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormGroupDirective, ValidationErrors } from '@angular/forms';
import { merge } from 'rxjs';

@Directive({
  selector: '[appFieldError]',
  standalone: true,
})
export class FieldErrorDirective implements OnInit {
  name = input.required<string>({ alias: 'appFieldError' });
  fgDirective = inject(FormGroupDirective);
  elementRef = inject(ElementRef);
  destroyRef = inject(DestroyRef);
  private control!: AbstractControl | null;

  ngOnInit() {
    this.control = this.fgDirective.form.get(this.name());
    if (this.control) {
      merge(this.control.statusChanges, this.control.valueChanges)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            if (this.control?.pristine) {
              this.removeError();
            } else if (this.control?.status === 'INVALID') {
              this.showError();
            } else {
              this.removeError();
            }
          },
        });
    }
  }

  private showError() {
    const controlErrors = this.control?.errors;
    if (controlErrors) {
      this.elementRef.nativeElement.innerHTML = this.getErrorMessage(controlErrors);
    } else {
      this.removeError();
    }
  }

  private removeError() {
    this.elementRef.nativeElement.innerHTML = '';
  }

  private getErrorMessage(controlErrors: ValidationErrors): string {
    let errorMessage = '';
    if (controlErrors['required']) {
      errorMessage = 'This field is required';
    } else if (controlErrors['email']) {
      errorMessage = 'Please enter a valid email address';
    } else if (controlErrors['minlength']) {
      errorMessage = `Must be at least ${controlErrors['minlength']?.['requiredLength']} characters long`;
    } else if (controlErrors['passwordsMatch']) {
      errorMessage = 'The passwords do not match.';
    }
    return errorMessage;
  }
}
