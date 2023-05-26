import { Directive, ElementRef, inject, Input, NgZone, OnInit, Renderer2 } from '@angular/core';
import { flattenDeep, forEach, values } from 'lodash';

export type ButtonStyle = 'primary' | 'white';

interface ButtonStyleClasses {
  bg: string[];
  border: string[];
  text: string[];
}

const defaultClasses: string[] = [
  'border',
  'inline-block',
  'mb-4',
  'px-4',
  'py-3',
  'rounded',
  'shadow-md',
  'text-center',
];

const styleClassesMap: Record<ButtonStyle, ButtonStyleClasses> = {
  'primary': {
    bg: ['bg-sky-500', 'hover:bg-sky-600'],
    border: ['border-sky-500'],
    text: ['text-white'],
  },
  'white': {
    bg: ['bg-white', 'hover:bg-gray-50/50'],
    border: ['border-gray-300'],
    text: ['text-gray-800'],
  },
};

const allStyleClasses: string[] = flattenDeep(values(styleClassesMap).map(values));

@Directive({
  selector: '[appButtonStyle]',
  standalone: true,
})
export class ButtonStyleDirective implements OnInit {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private ngZone = inject(NgZone);

  @Input('appButtonStyle')
  set buttonStyle(color: ButtonStyle) {
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
