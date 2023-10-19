import { computed, Directive, HostBinding, Input, signal } from '@angular/core';

const base = [
  'bg-white',
  'border',
  'rounded'
];
const sizes = {
  sm: [
    'px-2',
    'py-1',
    'text-sm',
  ],
  md: [
    'px-4',
    'py-3',
  ],
};
const widths = {
  auto: [
    'w-auto',
  ],
  full: [
    'w-full',
  ],
};

@Directive({
  selector: '[appInput]',
  standalone: true
})
export class InputDirective {
  private _size = signal<keyof typeof sizes>('md');
  private _width = signal<keyof typeof widths>('full');
  private _all = computed(() => {
    const size = this._size();
    const width = this._width();
    return [
      ...base,
      ...sizes[size],
      ...widths[width],
    ];
  });

  @Input()
  set width(width: keyof typeof widths | '') {
    this._width.set(width || 'full');
  }

  @Input()
  set appInput(size: keyof typeof sizes | '') {
    this._size.set(size || 'md');
  }

  @HostBinding('class')
  get allClasses(): string {
    return this._all().join(' ');
  }
}
