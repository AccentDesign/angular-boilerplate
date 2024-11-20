import { NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-logo,[app-logo]",
    imports: [NgOptimizedImage],
    template: ` <img alt="logo" height="348" width="1280" ngSrc="assets/logo.png" /> `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
}
