import {
  IAddonsErrors,
  IBannersErrors,
  ICategoryErrors,
  IOptionErrors,
  IRiderErrors,
  ISignInFormErrors,
  ISignUpFormErrors,
  IVendorErrors,
  IUpdateProfileFormErrors,
  IVariationErrors,
} from '@/lib/utils/interfaces/forms';

import { IRestaurantFormErrors } from '@/lib/utils/interfaces/forms/restaurant.form.interface';
import { IZoneErrors } from '../../interfaces/forms/zone.form.interface';
import { IStaffErrors } from '../../interfaces/forms/staff.form.interface';
import { ICuisineErrors } from '../../interfaces/forms/cuisine.form.interface';
import { ICouponErrors } from '../../interfaces/forms/coupon.form.interface';
import { IFoodErrors } from '../../interfaces/forms/food.form.interface';

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

export const ProfileErrors: IUpdateProfileFormErrors = {
  name: ['Required'],
  email: ['Required', 'Invalid email'],
  username: ['Required', 'Invalid email'],
  password: ['Required', ...PasswordErrors],
  confirmPassword: ['Required', 'Password must match'],
  address: ['Required'],
  deliveryTime: ['Required'],
  minOrder: ['Required'],
  salesTax: ['Required'],
  orderprefix: ['Required'],
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
  price: ['Required', 'Minimum value must be greater than 0', 'Maximum price is 99999'],
};

export const AddonsErrors: IAddonsErrors = {
  _id: [],
  title: ['Required'],
  description: [],
  quantityMinimum: ['Required', 'Minimum value must be greater than 0', 'Maximum price is 99999'],
  quantityMaximum: ['Required', 'Minimum value must be greater than 0', 'Maximum price is 99999'],
  options: ['Required', 'Option field must have at least 1 items'],
};

export const ZoneErrors: IZoneErrors = {
  title: ['Required'],
  description: ['Required'],
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

export const CuisineErrors: ICuisineErrors = {
  name: ['Required'],
  description: ['Required'],
  shopType: ['Required'],
};

export const CouponErrors: ICouponErrors = {
  title: ['Required'],
  discount: ['Required'],
  enabled: ['Required'],
};



export const FoodErrors: IFoodErrors = {
  title: ['Required'],
  description: [],
  image: ["Required"],
  category: ['Required'],
};

export const VariationErrors: IVariationErrors = {
  title: ["Required"],
  discount: ["Required"],
  price: ["Required",'Minimum value must be greater than 0']
}