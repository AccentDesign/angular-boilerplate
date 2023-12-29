import { NgIf, NgIfContext } from '@angular/common';
import { computed, Directive, inject, Input, signal, TemplateRef } from '@angular/core';
import { AuthRepository } from '@modules/auth/shared/auth.repository';

/**
 * <p *appHasScope="'admin'">admin</p>
 * <p *appHasScope="'admin'; else denied">admin</p>
 * <ng-template #denied>denied</ng-template>
 */
@Directive({
  selector: '[appHasScope]',
  standalone: true,
  hostDirectives: [NgIf],
})
export class HasScopeDirective {
  private ngIfRef = inject(NgIf);
  private authRepository = inject(AuthRepository);

  private scope = signal<string | null>(null);
  private hasScope = computed<boolean>(() => {
    const user = this.authRepository.currentUser();
    const scope = this.scope();
    return !!(scope && user?.user_type.scopes.includes(scope));
  });

  @Input()
  set appHasScope(scope: string) {
    this.scope.set(scope);
    this.ngIfRef.ngIf = this.hasScope();
  }

  @Input()
  set appHasScopeElse(template: TemplateRef<NgIfContext<unknown>> | null) {
    this.ngIfRef.ngIfElse = template;
  }
}
