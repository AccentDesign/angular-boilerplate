import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, inject, Input } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-errors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorsComponent implements DoCheck {
  private changeDetectorRef = inject(ChangeDetectorRef);

  @Input() formRef: FormGroupDirective | undefined;
  @Input() control: FormControl | undefined;
  @Input() name = 'This';

  ngDoCheck() {
    this.changeDetectorRef.markForCheck();
  }
}
