import { TVendorFormPosition, TVendorMobileTabs } from '@/lib/utils/types';
import { IGlobalComponentProps, IQueryResult } from './global.interface';

export interface IVendorCardProps extends IGlobalComponentProps {
  _id: string;
  userType: string;
  email: string;
  totalRestaurants: number;
}

export interface IVendorAddFormComponentProps extends IGlobalComponentProps {
  position?: TVendorFormPosition;
}

export interface IVendorContextProps {
  vendorFormVisible: boolean;
  onSetVendorFormVisible: (status: boolean) => void;
  vendorId: string | null;
  onSetVendorId: (val: string) => void;
  vendorResponse: IQueryResult<IVendorResponseGraphQL | undefined, undefined>;
  globalFilter: string;
  onSetGlobalFilter: (filter: string) => void;
  filtered?: IVendorReponse[];
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

// Vendors Respect

export interface IVendorReponse {
  _id: string;
  email: string;
  userType: string;
  restaurants: {
    __typename: 'Restaurant';
    _id: string;
  }[];
  __typename: 'OwnerData';
}

export interface IVendorResponseGraphQL {
  vendors: IVendorReponse[];
}
