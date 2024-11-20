import { Component, inject, OnInit, signal } from "@angular/core";
import { LoginFormComponent } from "@modules/auth/components/login-form/login-form.component";
import { RegisterFormComponent } from "@modules/auth/components/register-form/register-form.component";
import { AuthPaths } from "@modules/auth/shared/auth-routes";
import { AuthRepository } from "@modules/auth/shared/auth.repository";
import { LogoComponent } from "@modules/shared/components/logo/logo.component";

@Component({
    selector: "app-log-in-page",
    imports: [
        LogoComponent,
        LoginFormComponent,
        RegisterFormComponent
    ],
    templateUrl: "./log-in-page.component.html"
})
export default class LogInPageComponent implements OnInit {
  protected readonly AuthPaths = AuthPaths;
  activeTab = signal(0);
  private authRepository = inject(AuthRepository);

  ngOnInit(): void {
    this.authRepository.clear();
  }

  activate(index: number) {
    this.activeTab.set(index);
  }
}
