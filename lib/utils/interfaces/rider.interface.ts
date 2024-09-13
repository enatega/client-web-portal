import { TSideBarFormPosition } from '../types/sidebar';
import { IGlobalComponentProps } from './global.interface';

export interface IRidersHeaderComponentsProps extends IGlobalComponentProps {
  setIsAddRiderVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IRidersMainComponentsProps extends IGlobalComponentProps {}

export interface IRidersAddFormComponentProps extends IGlobalComponentProps {
  position?: TSideBarFormPosition;
  isAddRiderVisible: boolean;
  setIsAddRiderVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export type Rider = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  zone: string;
  available: boolean;
};
