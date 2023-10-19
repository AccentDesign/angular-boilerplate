import { computed, Directive, HostBinding, Input, signal } from '@angular/core';

const base = [
  'border',
  'inline-block',
  'rounded',
  'shadow-sm',
  'text-center',
  'disabled:opacity-75',
  'disabled:cursor-not-allowed',
];
const colors = {
  danger: [
    'bg-red-800',
    'border-red-800',
    'hover:bg-red-900',
    'text-white',
  ],
  primary: [
    'bg-blue-800',
    'border-blue-800',
    'hover:bg-blue-900',
    'text-white',
  ],
  white: [
    'bg-white',
    'border-gray-300',
    'text-gray-800',
    'hover:bg-gray-50/50',
  ],
};
const sizes = {
  sm: ['px-2', 'py-1', 'text-sm'],
  md: ['px-4', 'py-3'],
};

@Directive({
  selector: '[appButton]',
  standalone: true
})
export class ButtonDirective {
  private _color = signal<keyof typeof colors>('primary');
  private _size = signal<keyof typeof sizes>('md');
  private _all = computed(() => {
    const color = this._color();
    const size = this._size();
    return [
      ...base,
      ...colors[color],
      ...sizes[size],
    ];
  });

  @Input()
  set size(size: keyof typeof sizes | '') {
    this._size.set(size || 'md');
  }

  @Input()
  set appButton(color: keyof typeof colors | '') {
    this._color.set(color || 'primary');
  }

  @HostBinding('class')
  get allClasses(): string {
    return this._all().join(' ');
  }
}
