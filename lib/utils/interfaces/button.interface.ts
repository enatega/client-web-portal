import { IGlobalComponentProps } from './global.interface';

export interface ICustomButtonProps extends IGlobalComponentProps {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  rounded?: boolean;
  outlined?: boolean;
  icon?: string;
  type?: 'submit' | 'reset' | 'button';
}
