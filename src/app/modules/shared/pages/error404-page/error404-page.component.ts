import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { LogoComponent } from '@modules/shared/components/logo/logo.component';
import { ButtonDirective } from '@modules/shared/directives/button.directive';

@Component({
  selector: 'app-error404-page',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    LogoComponent,
    ButtonDirective
  ],
  templateUrl: './error404-page.component.html'
})
export default class Error404PageComponent {

}
