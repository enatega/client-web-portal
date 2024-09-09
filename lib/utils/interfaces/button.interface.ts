import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IGlobalComponentProps } from './global.interface';

export interface ICustomButtonProps extends IGlobalComponentProps {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  rounded?: boolean;
  outlined?: boolean;
  icon?: string;
  type?: 'submit' | 'reset' | 'button';
}

interface IIconStyles {
  color: string;
}

export interface TextIconClickableProps extends IGlobalComponentProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  icon?: IconProp;
  iconStyles?: IIconStyles;
  title?: string;
}
