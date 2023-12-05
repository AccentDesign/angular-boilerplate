import { DestroyRef, Directive, ElementRef, inject, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormGroupDirective, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appFormFieldError]',
  standalone: true,
})
export class FormFieldErrorDirective implements OnInit {
  @Input('appFormFieldError') controlName!: string;
  fgDirective = inject(FormGroupDirective);
  elementRef = inject(ElementRef);
  destroyRef = inject(DestroyRef);
  private control!: AbstractControl | null;

  ngOnInit() {
    this.control = this.fgDirective.form.get(this.controlName);
    if (this.control && this.control.statusChanges) {
      this.control.statusChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (status: string) => {
          if (status == 'INVALID') {
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
