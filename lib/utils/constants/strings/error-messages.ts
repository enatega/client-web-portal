import { ISignFormErrors, IVendorErrors } from '../../interfaces/forms';
import { IRestaurantFormErrors } from '../../interfaces/forms/restaurant.form.interface';

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
  cuisines: ['Required'],
};
