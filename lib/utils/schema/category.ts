import * as Yup from 'yup';

export const CategorySchema = Yup.object().shape({
  _id: Yup.string().nullable(),
  title: Yup.string().min(2).max(50).required('Required'),
});
