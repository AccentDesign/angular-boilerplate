import {
  ButtonStyle,
  ButtonStyleClasses,
  MessageStyle,
  MessageStyleClasses
} from '@modules/shared/interfaces/element-style';

export const buttonDefaultClasses: string[] = [
  'border',
  'inline-block',
  'mb-4',
  'px-4',
  'py-3',
  'rounded',
  'shadow-md',
  'text-center',
  'disabled:opacity-75',
  'disabled:cursor-not-allowed'
];

export const buttonStylesMap: Record<ButtonStyle, ButtonStyleClasses> = {
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

export const messageDefaultClasses: string[] = [
  'border-l-4',
  'p-4',
  'mb-4',
];

export const messageStylesMap: Record<MessageStyle, MessageStyleClasses> = {
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
