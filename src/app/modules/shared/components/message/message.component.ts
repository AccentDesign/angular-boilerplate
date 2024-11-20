import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideTerminal } from "@ng-icons/lucide";

type Variant = "default" | "destructive";

@Component({
  selector: "app-message",
  imports: [NgIcon],
  templateUrl: "./message.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ lucideTerminal })],
})
export class MessageComponent {
  variant = input<Variant>("default");
  title = input.required<string>();
}

