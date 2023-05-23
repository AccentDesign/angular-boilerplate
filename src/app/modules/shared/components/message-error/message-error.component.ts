import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-message-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageErrorComponent {

}
