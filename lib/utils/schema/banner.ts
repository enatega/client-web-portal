import * as Yup from 'yup';

export const BannerSchema = Yup.object().shape({
  name: Yup.string().min(2).max(35).required('Required'),
  username: Yup.string().min(2).max(35).required('Required'),
  title: Yup.string().min(2).max(35).required('Required'),
  description: Yup.string().min(2).max(35).required('Required'),
  action: Yup.object()
    .shape({
      label: Yup.string().required('Required'),
      code: Yup.string().required('Required'),
    })
    .required('Required'),
  screen: Yup.string().min(2).max(35).required('Required'),
  file: Yup.string().min(2).max(35).required('Required'),
});
