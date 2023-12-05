import { computed, Directive, HostBinding, Input, signal } from '@angular/core';

const base = ['border-l-4', 'border-solid', 'mb-6'];
const colors = {
  error: ['bg-red-100', 'border-l-red-500', 'text-red-800'],
  success: ['bg-green-100', 'border-l-green-500', 'text-green-800'],
  white: ['bg-gray-50/50', 'border-l-gray-200', 'text-gray-600'],
};
const sizes = {
  md: ['px-4', 'py-3'],
};

@Directive({
  selector: '[appAlert]',
  standalone: true,
})
export class AlertDirective {
  private _color = signal<keyof typeof colors>('success');
  private _size = signal<keyof typeof sizes>('md');
  private _all = computed(() => {
    const color = this._color();
    const size = this._size();
    return [...base, ...colors[color], ...sizes[size]];
  });

  @Input()
  set size(size: keyof typeof sizes | '') {
    this._size.set(size || 'md');
  }

  @Input()
  set appAlert(color: keyof typeof colors | '') {
    this._color.set(color || 'success');
  }

  @HostBinding('class')
  get allClasses(): string {
    return this._all().join(' ');
  }
}
