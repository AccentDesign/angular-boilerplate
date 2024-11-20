import { Component } from "@angular/core";
import { ForgotPwFormComponent } from "@modules/auth/components/forgot-pw-form/forgot-pw-form.component";
import { LogoComponent } from "@modules/shared/components/logo/logo.component";

@Component({
    selector: "app-forgot-pw-page",
    imports: [LogoComponent, ForgotPwFormComponent],
    templateUrl: "./forgot-pw-page.component.html"
})
export default class ForgotPwPageComponent {
}
