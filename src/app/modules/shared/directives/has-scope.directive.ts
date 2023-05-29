import { NgIf } from '@angular/common';
import { computed, Directive, inject, Input, signal, TemplateRef } from '@angular/core';
import { AuthRepository } from '@modules/auth/shared/auth.repository';
import { includes } from 'lodash';

@Directive({
  selector: '[appHasScope]',
  standalone: true,
  hostDirectives: [NgIf]
})
export class HasScopeDirective {
  private ngIfRef = inject(NgIf);
  private authRepository = inject(AuthRepository);

  private scope = signal<string | null>(null);
  private hasScope = computed<boolean>(() => {
    const user = this.authRepository.currentUser();
    return !!(user && user.user_type.scopes && includes(user.user_type.scopes, this.scope()));
  });

  @Input()
  set appHasScope(scope: string) {
    this.scope.set(scope);
    this.ngIfRef.ngIf = this.hasScope();
  }

  @Input()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set appHasScopeElse(template: TemplateRef<any>) {
    this.ngIfRef.ngIfElse = template;
  }
}
