import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-logo-mini,[app-logo-mini]',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <img alt="logo" height="35" width="129" ngSrc="assets/logo.png"/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoMiniComponent {

}
