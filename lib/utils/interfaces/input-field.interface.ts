import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { InputMaskChangeEvent } from 'primereact/inputmask';
import { FormEvent } from 'primereact/ts-helpers';
import {
  CSSProperties,
  HTMLInputAutoCompleteAttribute,
  SyntheticEvent,
} from 'react';
import { TNumberMode } from '../types';
import { IGlobalComponentProps } from './global.interface';

// Global
interface IGlobalTextFieldProps extends IGlobalComponentProps {
  type: string;
  placeholder?: string;
  name: string;
  maxLength?: number;
  value?: string;
  showLabel: boolean;
  style?: CSSProperties;
  isLoading?: boolean;
}
// Extra
interface IIconProperties {
  position: 'left' | 'right';
  icon: IconDefinition;
  style?: CSSProperties;
}
// Fields
export interface ITextFieldProps extends IGlobalTextFieldProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface IIconTextFieldProps extends IGlobalTextFieldProps {
  iconProperties: IIconProperties;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface IPhoneTextFieldProps extends IGlobalTextFieldProps {
  mask: string;
  showLabel: boolean;
  onChange?: (event: InputMaskChangeEvent) => void;
}
export interface INumberTextFieldProps
  extends Omit<IGlobalTextFieldProps, 'value' | 'type'> {
  value: number | null;
  min: number;
  max?: number;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  mode?: TNumberMode;
  currency?: string;
  locale?: string;
  prefix?: string;
  suffix?: string;
  useGrouping?: boolean;
  onChange: (field: string, value: number | null) => void;
}
export interface IPasswordTextFieldProps
  extends Omit<IGlobalTextFieldProps, 'type'> {
  autoComplete?: HTMLInputAutoCompleteAttribute | undefined;
  feedback?: boolean;
  iconProperties?: Omit<IIconProperties, 'icon'> & { icon?: IconDefinition };
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ICustomRadiusInputFieldComponentProps
  extends Omit<IGlobalTextFieldProps, 'value' | 'onChange'> {
  value: number;
  onChange?: (val: number) => void;
  min?: number;
  max?: number;
  loading: boolean;
}

export interface ITimeTextField {
  value: Date | null; // Updated to Date | null
  onChange?: (event: FormEvent<Date, SyntheticEvent<Element, Event>>) => void;
  placeholder?: string;
  showLabel: boolean;
  isLoading?: boolean;
  className?: string;
}
