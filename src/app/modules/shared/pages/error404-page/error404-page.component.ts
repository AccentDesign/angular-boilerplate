import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { LogoComponent } from '@modules/shared/components/logo/logo.component';
import { TailwindDirective } from '@modules/shared/directives/tailwind.directive';

@Component({
  selector: 'app-error404-page',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    TailwindDirective,
    LogoComponent
  ],
  templateUrl: './error404-page.component.html'
})
export class Error404PageComponent {

}
