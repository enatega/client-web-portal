import * as Yup from 'yup';

export const TippingSchema = Yup.object().shape({
  tip1: Yup.number().required('Tip 1 is required').min(0).max(100),
  tip2: Yup.number().required('Tip 2 is required').min(0).max(100),
  tip3: Yup.number().required('Tip 3 is required').min(0).max(100),
});
