import { TVendorFormPosition, TVendorMobileTabs } from '@/lib/utils/types';
import { IGlobalComponentProps } from './global.interface';

export interface IVendorCardProps extends IGlobalComponentProps {
  index: number;
}

export interface IVendorAddFormComponentProps extends IGlobalComponentProps {
  position?: TVendorFormPosition;
}

export interface IVendorContextProps {
  vendorFormVisible: boolean;
  onSetVendorFormVisible: (status: boolean) => void;
  vendorId: number | null;
  onSetVendorId: (val: number) => void;
}

export interface IVendorHeaderComponentsProps extends IGlobalComponentProps {
  selectedVendorFilter: string;
  setSelectedVendorFilter: (val: string) => void;
}

export interface IVendorMobileTabsComponentProps extends IGlobalComponentProps {
  activeTab: TVendorMobileTabs;
  setActiveTab: (val: TVendorMobileTabs) => void;
}

export interface IVendorMainComponentProps
  extends IVendorHeaderComponentsProps,
    IVendorMobileTabsComponentProps {
  selectedRestaurantFilter: string;
  setSelectedResturantFilter: (val: string) => void;
}
