import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/shared/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-log-out-page',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './log-out-page.component.html'
})
export class LogOutPageComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {
  }

  async ngOnInit(): Promise<void> {
    try {
      await firstValueFrom(this.authService.logOut());
    } catch (error) {
      // do nothing
    }
  }

}
