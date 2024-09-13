import * as Yup from 'yup';
import { PasswordErrors } from '../constants';

export const RiderSchema = Yup.object().shape({
  riderName: Yup.string().min(2).max(35).required('Required'),
  riderEmail: Yup.string().email('Invalid email').required('Required'),
  riderPassword: Yup.string()
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
  riderConfirmPassword: Yup.string()
    .nullable()
    .oneOf([Yup.ref('vendorPassword'), null], 'Password must match')
    .required('Required'),
  riderZone: Yup.string().nullable().required('Required'),
});
