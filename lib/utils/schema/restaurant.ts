import * as Yup from 'yup';
import { PasswordErrors } from '../constants';
import { IDropdownSelectItem } from '../interfaces';

export const RestaurantSchema = Yup.object().shape({
  name: Yup.string().min(2).max(35).required('Required'),
  username: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, PasswordErrors[0])
    .max(20)
    .test('complexity', function (value: string | undefined) {
      const errors: string[] = [];

      if (!value) return this.createError({});

      if (value.length < 6) {
        errors.push(PasswordErrors[0]);
      }

      if (!/[a-z]/.test(value)) {
        errors.push(PasswordErrors[1]);
      }
      if (!/[A-Z]/.test(value)) {
        errors.push(PasswordErrors[2]);
      }
      if (!/\d/.test(value)) {
        errors.push(PasswordErrors[3]);
      }
      if (!/[@$!%*?&]/.test(value)) {
        errors.push(PasswordErrors[4]);
      }

      if (errors.length) {
        return this.createError({ message: errors.join(', ') });
      }
      return true;
    })
    .required('Required'),
  confirmPassword: Yup.string()
    .nullable()
    .oneOf([Yup.ref('password'), null], 'Password must match')
    .required('Required'),

  address: Yup.string().min(2).max(35).required('Required'),
  deliveryTime: Yup.string().min(2).max(35).required('Required'),
  minOrder: Yup.string().min(2).max(35).required('Required'),
  salesTax: Yup.string().min(2).max(35).required('Required'),
  shopType: Yup.mixed<IDropdownSelectItem>().required('Required'),
  cuisines: Yup.array()
    .of(Yup.mixed<IDropdownSelectItem>())
    .min(1)
    .required('Required'),
});
