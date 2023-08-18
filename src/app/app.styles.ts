export type AlertStyles = {
  kind: 'alert';
  size?: keyof typeof alertStyles.sizes;
  color?: keyof typeof alertStyles.colors;
};

export type AnchorStyles = {
  kind: 'anchor';
  color?: keyof typeof anchorStyles.colors;
};

export type ButtonStyles = {
  kind: 'button';
  size?: keyof typeof buttonStyles.sizes;
  color?: keyof typeof buttonStyles.colors;
};

export type HeadingStyles = {
  kind: 'heading';
  size: keyof typeof headingStyles.sizes;
};

export type InputStyles = {
  kind: 'input';
  size?: keyof typeof inputStyles.sizes;
  width?: keyof typeof inputStyles.width;
};

export type Styles = AlertStyles | AnchorStyles | ButtonStyles | HeadingStyles | InputStyles;

export const anchorStyles = {
  base: ['hover:underline'],
  colors: {
    active: [],
    primary: ['text-blue-800'],
    white: ['text-white'],
  },
};

export const alertStyles = {
  base: ['border-l-4', 'mb-6'],
  sizes: {
    md: ['px-4', 'py-3'],
  },
  colors: {
    error: ['bg-red-100', 'border-l-red-500', 'text-red-800'],
    success: ['bg-green-100', 'border-l-green-500', 'text-green-800'],
    white: ['bg-gray-50/50', 'border-l-gray-200', 'text-gray-600'],
  },
};

export const buttonStyles = {
  base: ['border', 'inline-block', 'rounded', 'shadow-sm', 'text-center', 'disabled:opacity-75', 'disabled:cursor-not-allowed'],
  sizes: {
    sm: ['px-2', 'py-1', 'text-sm'],
    md: ['px-4', 'py-3'],
  },
  colors: {
    danger: ['bg-red-800', 'border-red-800', 'hover:bg-red-900', 'text-white'],
    primary: ['bg-blue-800', 'border-blue-800', 'hover:bg-blue-900', 'text-white'],
    white: ['bg-white', 'border-gray-300', 'text-gray-800', 'hover:bg-gray-50/50'],
  },
};

export const headingStyles = {
  base: ['font-light'],
  sizes: {
    '1': ['text-3xl'],
    '2': ['text-2xl'],
    '3': ['text-1xl'],
  },
};

export const inputStyles = {
  base: ['bg-white', 'border', 'rounded'],
  sizes: {
    sm: ['px-2', 'py-1', 'text-sm'],
    md: ['px-4', 'py-3'],
  },
  width: {
    auto: ['w-auto'],
    full: ['w-full'],
    '96': ['w-96'],
  },
};
