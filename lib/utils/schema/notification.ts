import * as Yup from 'yup';
export const NotificationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'At least 3 characters are required')
    .max(25, 'You have reached the MAX limit of 25 charachters')
    .required('Title is required'),
  body: Yup.string()
    .min(25, 'At least 25 characters are required')
    .max(1500, 'You have reached the MAX limit of 1500 charachters')
    .required('Description is Required'),
});
