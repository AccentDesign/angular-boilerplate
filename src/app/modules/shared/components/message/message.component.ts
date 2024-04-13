import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideAlertTriangle } from '@ng-icons/lucide';
import {
  HlmAlertDescriptionDirective,
  HlmAlertDirective,
  HlmAlertIconDirective,
  HlmAlertTitleDirective,
} from '@spartan-ng/ui-alert-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

type Variant = 'default' | 'destructive';

@Component({
  selector: 'app-message',
  standalone: true,
  templateUrl: './message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    HlmIconComponent,
    HlmAlertDirective,
    HlmAlertIconDirective,
    HlmAlertTitleDirective,
    HlmAlertDescriptionDirective,
  ],
  providers: [provideIcons({ lucideAlertTriangle })],
})
export class MessageComponent {
  variant = input<Variant>('default');
  title = input.required<string>();
}
