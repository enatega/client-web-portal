import { ChangeEvent } from 'react';

export interface ICustomTextAreaField {
  label?: string;
  placeholder?: string;
  className: string;
  rows: number;
  showLabel?: boolean;
  value: string;
  name?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}