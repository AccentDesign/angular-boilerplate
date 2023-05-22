import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-errors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorsComponent implements DoCheck {
  @Input() formRef: FormGroupDirective | undefined;
  @Input() control: FormControl | undefined;
  @Input() name = 'This';

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngDoCheck() {
    this.changeDetectorRef.markForCheck();
  }
}
