import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorMessage } from '@modules/shared/interfaces/error-message';
import { HttpValidationError } from '@modules/shared/interfaces/http-validation-error';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  private error = new Subject<ErrorMessage>();

  getError(): Observable<ErrorMessage> {
    return this.error.asObservable();
  }

  publishError(location: string, error: HttpErrorResponse) {
    const messages = this.parseError(error);
    this.error.next({ location, messages });
  }

  publishMessages(location: string, messages: string[]) {
    this.error.next({ location, messages });
  }

  parseError(error: HttpErrorResponse): string[] {
    const defaultError = [error.message];

    if (!error.error) {
      return defaultError;
    }

    const detail = error.error.detail;

    if (typeof detail === 'string') {
      return [detail];
    }

    if (Array.isArray(detail) && error.status === 422) {
      const errors = detail as HttpValidationError[];
      return errors.map((e) => `${e.loc[e.loc.length - 1]}, ${e.msg}`);
    }

    return defaultError;
  }
}
