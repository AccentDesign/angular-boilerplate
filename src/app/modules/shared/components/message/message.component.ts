import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type Color = 'success' | 'error' | 'white';

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
  color = input<Color>('success');
}
