import { TSideBarFormPosition } from '../types/sidebar';
import { IGlobalComponentProps } from './global.interface';

export interface IBannersHeaderComponentsProps extends IGlobalComponentProps {
  setIsAddBannerVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IBannersMainComponentsProps extends IGlobalComponentProps {
  setIsAddBannerVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setBanner: React.Dispatch<React.SetStateAction<IBannersResponse | null>>;
}

export interface IBannersAddFormComponentProps extends IGlobalComponentProps {
  position?: TSideBarFormPosition;
  isAddBannerVisible: boolean;
  banner: IBannersResponse | null;
  onHide: () => void;
}

export type IBannersResponse = {
  _id: string;
  title: string;
  description: string;
  action: 'navigate' | 'openModal';
  screen: string;
  file: string;
  parameters: string;
};

export interface IBannersDataResponse {
  banners: IBannersResponse[];
}
