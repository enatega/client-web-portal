import {
  IBannersErrors,
  ISignFormErrors,
  IVendorErrors,
} from '../../interfaces/forms';
import { IRestaurantFormErrors } from '../../interfaces/forms/restaurant.form.interface';
import { IRiderErrors } from '../../interfaces/forms/riders.form.interface';
import { IStaffErrors } from '../../interfaces/forms/staff.form.interface';

export const PasswordErrors = [
  'At least 6 characters',
  'At least one lowercase letter (a-z)',
  'At least one uppercase letter (A-Z)',
  'At least one number (0-9)',
  'At least one special character',
  'Password does not match',
];

export const SignUpErrors: ISignFormErrors = {
  firstName: ['Required'],
  lastName: ['Required'],
  email: ['Required', 'Invalid email'],
  password: ['Required', ...PasswordErrors],
  confirmPassword: ['Required', 'Password must match'],
};

export const VendorErrors: IVendorErrors = {
  name: ['Required'],
  email: ['Required', 'Invalid email'],
  password: ['Required', ...PasswordErrors],
  confirmPassword: ['Required', 'Password must match'],
};

export const RestaurantErrors: IRestaurantFormErrors = {
  name: ['Required'],
  username: ['Required', 'Invalid email'],
  password: ['Required', ...PasswordErrors],
  confirmPassword: ['Required', 'Password must match'],
  address: ['Required'],
  deliveryTime: ['Required'],
  minOrder: ['Required'],
  salesTax: ['Required'],
  shopType: ['Required'],
  cuisines: ['Required', 'Cuisines field must have at least 1 items'],
};

export const RiderErrors: IRiderErrors = {
  name: ['Required'],
  username: ['Required'],
  password: ['Required', ...PasswordErrors],
  confirmPassword: ['Required', 'Password must match'],
  zone: ['Required'],
  phone: ['Required'],
};

export const BannersErrors: IBannersErrors = {
  title: ['Required'],
  description: ['Required'],
  action: ['Required'],
  screen: ['Required'],
  file: ['Required'],
};

export const StaffErrors: IStaffErrors = {
  name: ['Required'],
  email: ['Required'],
  phone: ['Required'],
  password: ['Required', ...PasswordErrors],
  confirmPassword: ['Required', 'Password must match'],
  isActive: ['Required'],
  permissions: ['Required', 'Permissions field must have at least 1 items'],
};
