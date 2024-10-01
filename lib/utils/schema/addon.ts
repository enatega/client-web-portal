import * as Yup from 'yup';
import { IDropdownSelectItem } from '../interfaces';
import { MAX_PRICE, MIN_PRICE } from '../constants';

export const AddonSchema = Yup.object({
  addons: Yup.array()
    .of(
      Yup.object().shape({
        _id: Yup.string().nullable(),
        title: Yup.string().min(2).max(50).required('Required'),
        description: Yup.string().min(2).max(50).optional(),
        quantityMinimum: Yup.number()
          .min(MIN_PRICE, 'Minimum value must be greater than 0')
          .max(MAX_PRICE)
          .required('Required'),
        quantityMaximum: Yup.number()
          .min(
            Yup.ref('quantityMinimum'),
            'Maximum must be greater than minimum.'
          )
          .max(99999)
          .required('Required'),

        options: Yup.array()
          .of(Yup.mixed<IDropdownSelectItem>())
          .min(1, 'Option field must have at least 1 items')
          .required('Required'),
      })
    )
    .min(1)
    .required('Required'),
});
