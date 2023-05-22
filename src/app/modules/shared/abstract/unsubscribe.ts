import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * The `Unsubscribe` directive provides a base implementation of `OnDestroy`
 * that can be used to automatically unsubscribe from observables when a
 * component or directive is destroyed.
 *
 * obs.pipe(takeUntil(this.destroy$)).subscribe(...)
 */
@Directive()
export abstract class Unsubscribe implements OnDestroy {
  protected destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
