import * as Yup from 'yup';
export const NotificationSchema = Yup.object().shape({
  title: Yup.string().required(),
  body: Yup.string().required(),
});
