import { ChangeEvent, CSSProperties } from 'react';

export interface ICustomTextAreaField {
  label?: string;
  placeholder?: string;
  className: string;
  rows?: number;
  showLabel?: boolean;
  value: string | undefined;
  name?: string;
  style?: CSSProperties;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}
