import { Component, inject, OnInit } from "@angular/core";
import { AuthPaths } from "@modules/auth/shared/auth-routes";
import { AuthService } from "@modules/auth/shared/auth.service";
import { LogoComponent } from "@modules/shared/components/logo/logo.component";
import { firstValueFrom } from "rxjs";

@Component({
    selector: "app-log-out-page",
    imports: [LogoComponent],
    templateUrl: "./log-out-page.component.html"
})
export default class LogOutPageComponent implements OnInit {
  protected readonly AuthPaths = AuthPaths;
  private authService = inject(AuthService);

  async ngOnInit(): Promise<void> {
    try {
      await firstValueFrom(this.authService.logOut());
    } catch {
      // do nothing
    }
  }
}
