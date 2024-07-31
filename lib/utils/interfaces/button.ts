import { IGlobalComponentProps } from './global';

export interface ICustomButtonProps extends IGlobalComponentProps {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  rounded?: boolean;
  outlined?: boolean;
  icon?: string;
}
