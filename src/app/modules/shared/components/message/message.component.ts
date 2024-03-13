import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  templateUrl: './message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
  styles: `
    :host {
      @apply block;
    }
  `,
})
export class MessageComponent {
  @Input() color: 'success' | 'error' | 'white' = 'success';
}
