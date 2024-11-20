import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { SettingsRoutes } from "@modules/settings/shared/settings-routes";
import { NavComponent } from "@modules/shared/components/nav/nav.component";

@Component({
    selector: "app-my-settings",
    imports: [NavComponent, RouterLinkActive, RouterLink, RouterOutlet],
    templateUrl: "./my-settings.component.html"
})
export class MySettingsComponent {
  navItems = [
    { label: "Profile", route: SettingsRoutes.profile },
    { label: "Password", route: SettingsRoutes.password }
  ];
}
