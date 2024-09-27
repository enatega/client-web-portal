import { IGlobalComponentProps } from './global.interface';

export interface ICustomInputSwitchComponentProps
  extends IGlobalComponentProps {
  loading?: boolean;
  isActive: boolean;
  label?: string;
  onChange: () => void;
  reverse?: boolean;
}
