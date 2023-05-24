import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirm = control.get('password_confirm');
  if (password && confirm && password.value !== confirm.value) {
    confirm.setErrors({ passwordsMatch: true });
    return { passwordsMatch: true };
  }
  return null;
};
