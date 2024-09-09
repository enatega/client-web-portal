import { TVendorFormPosition } from '@/lib/utils/types';
import { IGlobalComponentProps } from './global.interface';

export interface IVendorCardProps extends IGlobalComponentProps {
  index: number;
}

export interface IVendorAddFormComponentProps extends IGlobalComponentProps {
  position?: TVendorFormPosition;
  visible: boolean;
  setVisibility(visible: boolean): void;
}

export interface IVendorContextProps {
  vendorFormVisible: boolean;
  onSetVendorFormVisible: (status: boolean) => void;
}
