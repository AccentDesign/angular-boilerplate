import { Directive, HostBinding, Input } from '@angular/core';

interface MessageOptions {
  style: keyof typeof MessageDirective.prototype.opts.styles;
}

@Directive({
  selector: '[appMessage]',
  standalone: true
})
export class MessageDirective {
  private appMessage: MessageOptions = {
    style: 'success'
  };

  opts = {
    defaults: [
      'border-l-4',
      'p-4',
      'mb-4',
    ],
    styles: {
      success: [
        'bg-green-100',
        'border-l-green-500',
        'text-green-800'
      ],
      error: [
        'bg-red-100',
        'border-l-red-500',
        'text-red-800'
      ],
      white: [
        'bg-gray-50/50',
        'border-l-gray-200',
        'text-gray-600'
      ]
    }
  };

  @HostBinding('class')
  @Input()
  set options(options: MessageOptions) {
    this.appMessage = { ...this.appMessage, ...options };
  }

  get options(): string {
    const style = this.appMessage.style;
    return [
      ...this.opts.defaults,
      ...this.opts.styles[style],
    ].join(' ');
  }
}
