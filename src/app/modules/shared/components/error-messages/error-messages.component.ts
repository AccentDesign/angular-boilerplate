import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MessageErrorComponent } from '@modules/shared/components/message-error/message-error.component';
import { ErrorMessage } from '@modules/shared/interfaces/error-message';
import { ErrorMessageService } from '@modules/shared/services/error-message.service';
import { filter, Observable } from 'rxjs';

@Component({
  selector: 'app-error-messages',
  standalone: true,
  imports: [
    CommonModule,
    MessageErrorComponent
  ],
  templateUrl: './error-messages.component.html'
})
export class ErrorMessagesComponent {
  @Input() location!: string;

  error$: Observable<ErrorMessage>;

  constructor(
    private errorService: ErrorMessageService,
  ) {
    this.error$ = this.errorService.getError().pipe(
      filter(msg => msg.location === this.location)
    );
  }
}
