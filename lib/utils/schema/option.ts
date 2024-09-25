import * as Yup from 'yup';

export const OptionSchema = Yup.object({
  options: Yup.array()
    .of(
      Yup.object().shape({
        _id: Yup.string().nullable(),
        title: Yup.string().min(2).max(50).required('Required'),
        description: Yup.string().min(2).max(50).optional(),
        price: Yup.number()
          .min(1, 'Minimum price is 1')
          .max(99999)
          .required('Required'),
      })
    )
    .min(1)
    .required('Required'),
});
