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
  category: ICategory | null;
}

export interface ICategoryMainComponentsProps extends IGlobalComponentProps {
  setIsAddCategoryVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCategory: React.Dispatch<React.SetStateAction<ICategory | null>>;
}

/* API */
export interface ICategory {
  _id: string;
  title: string;
}

export interface ICategoryByRestaurantResponse {
  restaurant: {
    _id: string;
    categories: ICategory[];
    __typename: string;
  };
}
