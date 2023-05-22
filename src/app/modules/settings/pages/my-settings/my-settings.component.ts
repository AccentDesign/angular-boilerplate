import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavComponent } from '@modules/shared/components/nav/nav.component';

@Component({
  selector: 'app-my-settings',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    RouterLinkActive,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './my-settings.component.html'
})
export class MySettingsComponent {

}
