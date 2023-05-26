import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MessageStyleDirective } from '@modules/shared/directives/message-style.directive';
import { ErrorMessage } from '@modules/shared/interfaces/error-message';
import { ErrorMessageService } from '@modules/shared/services/error-message.service';
import { BehaviorSubject, filter, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-error-messages',
  standalone: true,
  imports: [
    CommonModule,
    MessageStyleDirective
  ],
  templateUrl: './error-messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorMessagesComponent implements OnChanges {
  private errorService = inject(ErrorMessageService);

  @Input() location!: string;

  private locationSubject = new BehaviorSubject<string>(this.location);

  error$: Observable<ErrorMessage> = this.locationSubject.pipe(
    switchMap(location =>
      this.errorService.getError().pipe(
        filter(msg => msg.location === location)
      )
    )
  );

  ngOnChanges(changes: SimpleChanges): void {
    const location = changes['location'];
    if (location && location.currentValue !== location.previousValue) {
      this.locationSubject.next(location.currentValue);
    }
  }
}
