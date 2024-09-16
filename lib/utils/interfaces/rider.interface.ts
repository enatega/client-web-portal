// Interfaces
import { TSideBarFormPosition } from '../types/sidebar';
import { IGlobalComponentProps } from './global.interface';

export interface IRiderResponseZone {
  __typename: 'Zone';
  _id: string;
  title: string;
}

export interface IRiderResponse {
  __typename: 'Rider';
  _id: string;
  name: string;
  username: string;
  password: string;
  phone: string;
  available: boolean;
  zone: IRiderResponseZone;
}

// Define the structure of the query result object
export interface IRidersDataResponse {
  riders: IRiderResponse[];
}

export interface IRidersHeaderComponentsProps extends IGlobalComponentProps {
  setIsAddRiderVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IRidersMainComponentsProps extends IGlobalComponentProps {
  refetch: () => void;
  data: IRidersDataResponse | null | undefined;
  setIsAddRiderVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IRidersAddFormComponentProps extends IGlobalComponentProps {
  position?: TSideBarFormPosition;
  isAddRiderVisible: boolean;
  setIsAddRiderVisible: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

export interface IRiderHeaderProps extends IGlobalComponentProps {
  setIsAddRiderVisible: (visible: boolean) => void;
  globalFilterValue: string;
  onGlobalFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
