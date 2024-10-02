import { IDropdownSelectItem } from '../global.interface';

export interface IVariationForm {
  _id?: string;
  title: string;
  price: number;
  discount: number;
  addons: IDropdownSelectItem[] | null;
}

export interface IVariationErrors {
  _id?: string[];
  title: string[];
  discount: string[];
  price: string[];
  addons: string[];
}
