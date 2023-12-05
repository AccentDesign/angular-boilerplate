import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavComponent } from '@modules/shared/components/nav/nav.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './dashboard-page.component.html',
})
export default class DashboardPageComponent {}
