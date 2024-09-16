import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { InputMaskChangeEvent } from 'primereact/inputmask';
import { CSSProperties } from 'react';
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
  value: number;
  min: number;
  max?: number;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  mode?: TNumberMode;
  currency?: string;
  locale?: string;
  prefix?: string;
  suffix?: string;
  onChange: (field: string, value: number | null) => void;
}

export interface IPasswordTextFieldProps
  extends Omit<IGlobalTextFieldProps, 'type'> {
  feedback?: boolean;
  iconProperties?: Omit<IIconProperties, 'icon'> & { icon?: IconDefinition };
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ICustomNumberTextFieldProps extends IGlobalTextFieldProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
