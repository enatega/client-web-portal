import { IDropdownSelectItem } from '../global.interface';

// Errors
export interface IVendorErrors {
  _id: string[];
  name: string[];
  email: string[];
  password: string[];
  confirmPassword: string[];
}
export interface IVendorForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IRestauransVendorDetailsForm {
  _id: IDropdownSelectItem | null;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
