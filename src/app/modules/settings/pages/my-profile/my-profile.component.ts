import { Component } from "@angular/core";
import {
  EmailVerificationFormComponent
} from "@modules/settings/components/email-verification-form/email-verification-form.component";
import { ProfileFormComponent } from "@modules/settings/components/profile-form/profile-form.component";

@Component({
    selector: "app-my-profile",
    imports: [EmailVerificationFormComponent, ProfileFormComponent],
    templateUrl: "./my-profile.component.html"
})
export default class MyProfileComponent {
}
