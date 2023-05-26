import { Directive, ElementRef, inject, Input, NgZone, OnInit, Renderer2 } from '@angular/core';
import { flattenDeep, forEach, values } from 'lodash';

export type MessageStyle = 'success' | 'error' | 'white';

interface MessageStyleClasses {
  bg: string[];
  border: string[];
  text: string[];
}

const defaultClasses: string[] = [
  'border-l-4',
  'p-4',
  'mb-6',
];

const styleClassesMap: Record<MessageStyle, MessageStyleClasses> = {
  'success': {
    bg: ['bg-green-100'],
    border: ['border-l-green-500'],
    text: ['text-green-800'],
  },
  'error': {
    bg: ['bg-red-100'],
    border: ['border-l-red-500'],
    text: ['text-red-800'],
  },
  'white': {
    bg: ['bg-gray-50/50'],
    border: ['border-l-gray-200'],
    text: ['text-gray-600'],
  },
};

const allStyleClasses: string[] = flattenDeep(values(styleClassesMap).map(values));

@Directive({
  selector: '[appMessageStyle]',
  standalone: true,
})
export class MessageStyleDirective implements OnInit {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private ngZone = inject(NgZone);

  @Input('appMessageStyle')
  set messageStyle(color: MessageStyle) {
    this.ngZone.runOutsideAngular(() => {
      forEach(allStyleClasses, className => this.removeClass(className));
      const classNames = flattenDeep(values(styleClassesMap[color]));
      forEach(classNames, className => this.addClass(className));
    });
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      forEach(defaultClasses, className => this.addClass(className));
    });
  }

  private addClass(className: string) {
    this.renderer.addClass(this.el.nativeElement, className);
  }

  private removeClass(className: string) {
    this.renderer.removeClass(this.el.nativeElement, className);
  }
}
