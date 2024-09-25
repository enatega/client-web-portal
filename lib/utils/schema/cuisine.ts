import * as Yup from 'yup';

export const CuisineFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'At least 2 characters are must')
    .max(35, 'You have reached the maximum limit')
    .required('Name is a required field'),
  description: Yup.string()
    .min(15, 'Atleast 15 characters are required')
    .max(1500, 'You have reached the maximum limit of 1500 characters!')
    .required('Description is required'),
  shopType: Yup.object({
    label: Yup.string().required('Required'),
    code: Yup.string().required('Required'),
  }).required('Please choose one'),
});
