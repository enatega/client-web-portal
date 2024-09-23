import * as Yup from 'yup';

export const CouponFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'At least 2 characters are must!')
    .max(35, 'You have reached the maximum limit!')
    .required('Title is a required field'),
  discount: Yup.number().required('Discount is a required field'),
  enabled: Yup.boolean().required('Required').required('Please choose one'),
});
