import * as Yup from 'yup';
import { MAX_PRICE, MIN_PRICE } from '../constants';

export const OptionSchema = Yup.object({
  options: Yup.array()
    .of(
      Yup.object().shape({
        _id: Yup.string().nullable(),
        title: Yup.string().min(2).max(50).required('Required'),
        description: Yup.string().min(2).max(50).optional(),
        price: Yup.number()
          .min(MIN_PRICE, 'Minimum value must be greater than 0')
          .max(MAX_PRICE)
          .required('Required'),
      })
    )
    .min(1)
    .required('Required'),
});
