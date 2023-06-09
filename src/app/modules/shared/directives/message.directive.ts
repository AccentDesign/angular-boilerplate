import { Directive, ElementRef, inject, Input, OnInit, Renderer2 } from '@angular/core';

interface MessageOptions {
  style: keyof typeof MessageDirective.prototype.opts.styles;
}

@Directive({
  selector: '[appMessage]',
  standalone: true
})
export class MessageDirective implements OnInit {
  @Input() options!: MessageOptions;

  appMessage: MessageOptions = {
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

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    this.appMessage = { ...this.appMessage, ...this.options };

    const style = this.appMessage.style;

    this.opts.defaults.forEach(className => {
      this.renderer.addClass(this.el.nativeElement, className);
    });
    this.opts.styles[style].forEach(className => {
      this.renderer.addClass(this.el.nativeElement, className);
    });
  }
}
