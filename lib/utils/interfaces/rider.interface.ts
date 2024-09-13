import { TSideBarFormPosition } from '../types/sidebar';
import { IGlobalComponentProps } from './global.interface';

export interface IRidersHeaderComponentsProps extends IGlobalComponentProps {
  setIsAddRiderVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IRidersMainComponentsProps extends IGlobalComponentProps {
  setIsAddRiderVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IRidersAddFormComponentProps extends IGlobalComponentProps {
  position?: TSideBarFormPosition;
  isAddRiderVisible: boolean;
  setIsAddRiderVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IRiderDataComponentProps extends IGlobalComponentProps {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  zone: string;
  available: boolean;
}

export interface IRiderHeaderProps extends IGlobalComponentProps {
  setIsAddRiderVisible: (visible: boolean) => void;
  globalFilterValue: string;
  onGlobalFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
