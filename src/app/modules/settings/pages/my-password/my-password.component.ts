import { Component } from "@angular/core";
import { PasswordFormComponent } from "@modules/settings/components/password-form/password-form.component";

@Component({
    selector: "app-my-password",
    imports: [PasswordFormComponent],
    templateUrl: "./my-password.component.html"
})
export default class MyPasswordComponent {
}
