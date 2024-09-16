import { TSideBarFormPosition } from '../types/sidebar';
import { IGlobalComponentProps } from './global.interface';

export interface IBannersHeaderComponentsProps extends IGlobalComponentProps {
  setIsAddBannerVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IBannersMainComponentsProps extends IGlobalComponentProps {
  setIsAddBannerVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IBannersAddFormComponentProps extends IGlobalComponentProps {
  position?: TSideBarFormPosition;
  isAddBannerVisible: boolean;
  setIsAddBannerVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export type IBannerToggleComponentProps = {
  _id: string;
  image: string;
  title: string;
  description: string;
  screenName: string;
  action: 'Open Modal' | 'Navigate';
};
