export type ButtonStyle = 'primary' | 'white';
export type MessageStyle = 'success' | 'error' | 'white';

export interface ButtonElement {
  type: 'button';
  style: ButtonStyle;
}

export interface MessageElement {
  type: 'message';
  style: MessageStyle;
}

export interface ButtonStyleClasses {
  bg: string[];
  border: string[];
  text: string[];
}

export interface MessageStyleClasses {
  bg: string[];
  border: string[];
  text: string[];
}

export type ElementStyle = ButtonElement | MessageElement;
