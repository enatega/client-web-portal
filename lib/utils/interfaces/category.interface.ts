import { TSideBarFormPosition } from '../types/sidebar';
import {
  IGlobalComponentProps,
  IGlobalTableHeaderProps,
} from './global.interface';

export interface ICategoryHeaderProps extends IGlobalComponentProps {
  setIsAddCategoryVisible: (visible: boolean) => void;
}

export interface ICategoryTableHeaderProps extends IGlobalTableHeaderProps {}

export interface ICategoryAddFormComponentProps extends IGlobalComponentProps {
  position?: TSideBarFormPosition;
  isAddCategoryVisible: boolean;
  onHide: () => void;
  category: ICategoryResponse | null;
}

export interface ICategoryMainComponentsProps extends IGlobalComponentProps {
  setIsAddCategoryVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCategory: React.Dispatch<React.SetStateAction<ICategoryResponse | null>>;
}

/* API */
export interface ICategoryResponse {
  _id: string;
  title: string;
}
