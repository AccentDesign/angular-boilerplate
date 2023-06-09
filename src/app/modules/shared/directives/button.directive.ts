import { Directive, ElementRef, inject, Input, OnInit, Renderer2 } from '@angular/core';

interface ButtonOptions {
  style: keyof typeof ButtonDirective.prototype.opts.styles;
  size: keyof typeof ButtonDirective.prototype.opts.sizes;
}

@Directive({
  selector: '[appButton]',
  standalone: true
})
export class ButtonDirective implements OnInit {
  @Input() options!: ButtonOptions;

  appButton: ButtonOptions = {
    style: 'primary',
    size: 'md'
  };

  opts = {
    defaults: [
      'border',
      'inline-block',
      'rounded',
      'shadow-md',
      'text-center',
      'disabled:opacity-75',
      'disabled:cursor-not-allowed'
    ],
    styles: {
      primary: [
        'bg-sky-500',
        'border-sky-500',
        'text-white',
        'hover:bg-sky-600'
      ],
      white: [
        'bg-white',
        'border-gray-300',
        'text-gray-800',
        'hover:bg-gray-50/50'
      ]
    },
    sizes: {
      sm: [
        'px-2',
        'py-1'
      ],
      md: [
        'px-4',
        'py-3'
      ]
    },
  };

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    this.appButton = { ...this.appButton, ...this.options };

    const style = this.appButton.style;
    const size = this.appButton.size;

    this.opts.defaults.forEach(className => {
      this.renderer.addClass(this.el.nativeElement, className);
    });
    this.opts.styles[style].forEach(className => {
      this.renderer.addClass(this.el.nativeElement, className);
    });
    this.opts.sizes[size].forEach(className => {
      this.renderer.addClass(this.el.nativeElement, className);
    });
  }
}
