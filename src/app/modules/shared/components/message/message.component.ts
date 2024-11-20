import { ChangeDetectionStrategy, Component, input } from "@angular/core";

type Variant = "default" | "destructive";

@Component({
  selector: "app-message",
  standalone: true,
  templateUrl: "./message.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  variant = input<Variant>("default");
  title = input.required<string>();
}

