import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-message-ok',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-ok.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageOkComponent {

}
