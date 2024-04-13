import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MessageComponent } from '@modules/shared/components/message/message.component';
import { ErrorMessage } from '@modules/shared/interfaces/error-message';
import { ErrorMessageService } from '@modules/shared/services/error-message.service';
import { filter, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-error-messages',
  standalone: true,
  imports: [MessageComponent, AsyncPipe],
  templateUrl: './error-messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessagesComponent {
  location = input.required<string>();
  private errorService = inject(ErrorMessageService);
  private locationSubject = toObservable(this.location);

  error$: Observable<ErrorMessage> = this.locationSubject.pipe(
    switchMap((location) => this.errorService.getError().pipe(filter((msg) => msg.location === location))),
  );
}
