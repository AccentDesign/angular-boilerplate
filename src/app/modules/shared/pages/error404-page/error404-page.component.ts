import { Component } from "@angular/core";
import { AuthPaths } from "@modules/auth/shared/auth-routes";
import { LogoComponent } from "@modules/shared/components/logo/logo.component";

@Component({
    selector: "app-error404-page",
    imports: [LogoComponent],
    templateUrl: "./error404-page.component.html"
})
export default class Error404PageComponent {
  protected readonly AuthPaths = AuthPaths;
}
