import { Directive, HostBinding, Input } from '@angular/core';

interface ButtonOptions {
  style: keyof typeof ButtonDirective.prototype.opts.styles;
  size: keyof typeof ButtonDirective.prototype.opts.sizes;
}

@Directive({
  selector: '[appButton]',
  standalone: true
})
export class ButtonDirective {
  private appButton: ButtonOptions = {
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

  @HostBinding('class')
  @Input()
  set options(options: ButtonOptions) {
    this.appButton = { ...this.appButton, ...options };
  }

  get options(): string {
    const style = this.appButton.style;
    const size = this.appButton.size;
    return [
      ...this.opts.defaults,
      ...this.opts.styles[style],
      ...this.opts.sizes[size],
    ].join(' ');
  }
}
