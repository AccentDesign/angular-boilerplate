import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MessageComponent } from '@modules/shared/components/message/message.component';
import { ErrorMessage } from '@modules/shared/interfaces/error-message';
import { ErrorMessageService } from '@modules/shared/services/error-message.service';
import { BehaviorSubject, filter, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-error-messages',
  standalone: true,
  imports: [CommonModule, MessageComponent],
  templateUrl: './error-messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessagesComponent implements OnChanges {
  @Input() location!: string;
  private errorService = inject(ErrorMessageService);
  private locationSubject = new BehaviorSubject<string>(this.location);

  error$: Observable<ErrorMessage> = this.locationSubject.pipe(
    switchMap((location) => this.errorService.getError().pipe(filter((msg) => msg.location === location))),
  );

  ngOnChanges(changes: SimpleChanges): void {
    const location = changes['location'];
    if (location && location.currentValue !== location.previousValue) {
      this.locationSubject.next(location.currentValue);
    }
  }
}
