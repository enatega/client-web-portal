import { IDropdownSelectItem } from '../global.interface';

// Errors
export interface IRestaurantFormErrors {
  name: string[];
  username: string[];
  password: string[];
  confirmPassword: string[];
  address: string[];
  deliveryTime: string[];
  minOrder: string[];
  salesTax: string[];
  shopType: string[];
  cuisines: string[];
}

export interface IRestaurantForm {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  address: string;
  deliveryTime: string;
  minOrder: number;
  salesTax: number;
  shopType: IDropdownSelectItem | null;
  cuisines: IDropdownSelectItem[];
}
