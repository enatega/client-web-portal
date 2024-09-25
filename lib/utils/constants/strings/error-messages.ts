import {
  IAddonsErrors,
  IBannersErrors,
  ICategoryErrors,
  IOptionErrors,
  IRiderErrors,
  ISignInFormErrors,
  ISignUpFormErrors,
  IVendorErrors,
} from '@/lib/utils/interfaces/forms';

import { IRestaurantFormErrors } from '@/lib/utils/interfaces/forms/restaurant.form.interface';

export const PasswordErrors = [
  'At least 6 characters',
  'At least one lowercase letter (a-z)',
  'At least one uppercase letter (A-Z)',
  'At least one number (0-9)',
  'At least one special character',
  'Password does not match',
];

export const SignUpErrors: ISignUpFormErrors = {
  firstName: ['Required'],
  lastName: ['Required'],
  email: ['Required', 'Invalid email'],
  password: ['Required', ...PasswordErrors],
  confirmPassword: ['Required', 'Password must match'],
};

export const SignInErrors: ISignInFormErrors = {
  email: ['Required', 'Invalid email'],
  password: ['Required'],
};

export const VendorErrors: IVendorErrors = {
  _id: ['Required'],
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
  image: ['Required', 'Invalid image URL'],
  logo: ['Required', 'Invalid logo URL'],
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

export const CategoryErrors: ICategoryErrors = {
  _id: [],
  title: ['Required'],
};

export const OptionErrors: IOptionErrors = {
  _id: [],
  title: ['Required'],
  description: [],
  price: ['Required', 'Minimum price is 1', 'Maximum price is 99999'],
};

export const AddonsErrors: IAddonsErrors = {
  _id: [],
  title: ['Required'],
  description: [],
  quantityMinimum: ['Required', 'Minimum price is 1', 'Maximum price is 99999'],
  quantityMaximum: ['Required', 'Minimum price is 1', 'Maximum price is 99999'],
  options: ['Required', 'Option field must have at least 1 items'],
};
