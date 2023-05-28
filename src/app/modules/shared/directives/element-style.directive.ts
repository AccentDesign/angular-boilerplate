import { Directive, ElementRef, inject, Input, NgZone, Renderer2 } from '@angular/core';
import { ElementStyle } from '@modules/shared/interfaces/element-style';
import {
  buttonDefaultClasses,
  buttonStylesMap,
  messageDefaultClasses,
  messageStylesMap
} from '@modules/shared/utils/styles';
import { flattenDeep, values } from 'lodash';

@Directive({
  selector: '[appElementStyle]',
  standalone: true
})
export class ElementStyleDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private ngZone = inject(NgZone);

  @Input('appElementStyle')
  set elementStyle(element: ElementStyle) {
    this.ngZone.runOutsideAngular(() => {
      let allStyleClasses: string[];
      let defaultClasses: string[];
      let styleClasses: string[];

      switch (element.type) {
        case 'button':
          allStyleClasses = flattenDeep(values(buttonStylesMap).map(values));
          defaultClasses = buttonDefaultClasses;
          styleClasses = flattenDeep(values(buttonStylesMap[element.style]));
          break;
        case 'message':
          allStyleClasses = flattenDeep(values(messageStylesMap).map(values));
          defaultClasses = messageDefaultClasses;
          styleClasses = flattenDeep(values(messageStylesMap[element.style]));
          break;
        default:
          throw new Error(`Invalid element type ${element}`);
      }

      allStyleClasses.forEach(className => this.renderer.removeClass(this.el.nativeElement, className));
      defaultClasses.forEach(className => this.renderer.addClass(this.el.nativeElement, className));
      styleClasses.forEach(className => this.renderer.addClass(this.el.nativeElement, className));
    });
  }
}
