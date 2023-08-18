import { computed, Directive, HostBinding, Input, signal } from '@angular/core';
import { alertStyles, anchorStyles, buttonStyles, headingStyles, inputStyles, Styles } from '../../../app.styles';

@Directive({
  selector: '[appTailwind]',
  standalone: true
})
export class TailwindDirective {
  private style = signal<Styles | null>(null);
  private all = computed(() => {
    const style = this.style();

    if (!style) return [];

    switch (style.kind) {
      case 'alert':
        return [
          ...alertStyles.base,
          ...style.size ? alertStyles.sizes[style.size] : alertStyles.sizes.md,
          ...style.color ? alertStyles.colors[style.color] : alertStyles.colors.success,
        ];
      case 'anchor':
        return [
          ...anchorStyles.base,
          ...style.color ? anchorStyles.colors[style.color] : anchorStyles.colors.primary,
        ];
      case 'button':
        return [
          ...buttonStyles.base,
          ...style.size ? buttonStyles.sizes[style.size] : buttonStyles.sizes.md,
          ...style.color ? buttonStyles.colors[style.color] : buttonStyles.colors.primary,
        ];
      case 'heading':
        return [
          ...headingStyles.base,
          ...headingStyles.sizes[style.size],
        ];
      case 'input':
        return [
          ...inputStyles.base,
          ...style.size ? inputStyles.sizes[style.size] : inputStyles.sizes.md,
          ...style.width ? inputStyles.width[style.width] : inputStyles.width.auto,
        ];
      default:
        return [];
    }
  });

  @HostBinding('class')
  get fullClassList(): string {
    return this.all().join(' ');
  }

  @Input({ required: true })
  set appTailwind(styles: Styles) {
    this.style.set(styles);
  }
}
