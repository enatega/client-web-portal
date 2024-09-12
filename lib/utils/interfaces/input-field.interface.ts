import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { InputMaskChangeEvent } from 'primereact/inputmask';
import { CSSProperties } from 'react';
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
  onChange?: (event: InputMaskChangeEvent) => void;
}

export interface IPasswordTextFieldProps
  extends Omit<IGlobalTextFieldProps, 'type'> {
  iconProperties: Omit<IIconProperties, 'icon'> & { icon?: IconDefinition };
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
