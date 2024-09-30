import { TSideBarFormPosition } from '../types/sidebar';
import {
  IDropdownSelectItem,
  IGlobalComponentProps,
  IGlobalTableHeaderProps,
} from './global.interface';

export interface IFoodHeaderProps extends IGlobalComponentProps {
  setIsAddFoodVisible: (visible: boolean) => void;
}
export interface IFoodTableHeaderProps extends IGlobalTableHeaderProps {}

export interface IFoodAddFormComponentProps extends IGlobalComponentProps {
  position?: TSideBarFormPosition;
  isAddFoodVisible: boolean;
  onHide: () => void;
  food: IFoodGridItem | null;
}

export interface IFoodMainComponentsProps extends IGlobalComponentProps {
  setIsAddFoodVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setFood: React.Dispatch<React.SetStateAction<IFoodGridItem | null>>;
}

/* API */
export interface IFoodGridItem {
  _id: string;
  title: string;
  description: string;
  category: IDropdownSelectItem;
  image: string;
}

export interface IVariation {
  _id: string;
  title: string;
  price: number;
  discounted: number;
  addons: string[];
  __typename: string;
}

export interface IFood {
  _id: string;
  title: string;
  description: string;
  variations: IVariation[];
  image: string;
  isActive: boolean;
  __typename: string;
}

export interface IFoodCategory {
  _id: string;
  title: string;
  foods: IFood[];
  __typename: string;
}

export interface IRestaurant {
  _id: string;
  categories: IFoodCategory[];
  __typename: string;
}

export interface IFoodByRestaurantResponse {
  restaurant: IRestaurant;
}
