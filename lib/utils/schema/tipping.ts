import * as Yup from 'yup';

export const TippingSchema = Yup.object().shape({
  tip1: Yup.number()
    .transform((value, originalValue) => {
      // Convert to number if originalValue is a valid number
      const num = parseFloat(originalValue);
      return isNaN(num) ? undefined : num;
    })
    .required('Tip 1 is required')
    .test(
      'is-greater-than-zero',
      'Tip 1 must be greater than 0',
      (value) => Number(value) > 0
    ),

  tip2: Yup.number()
    .transform((value, originalValue) => {
      // Convert to number if originalValue is a valid number
      const num = parseFloat(originalValue);
      return isNaN(num) ? undefined : num;
    })
    .required('Tip 2 is required')
    .test(
      'is-greater-than-zero',
      'Tip 2 must be greater than 0',
      (value) => Number(value) > 0
    ),

  tip3: Yup.number()
    .transform((value, originalValue) => {
      // Convert to number if originalValue is a valid number
      const num = parseFloat(originalValue);
      return isNaN(num) ? undefined : num;
    })
    .required('Tip 3 is required')
    .test(
      'is-greater-than-zero',
      'Tip 3 must be greater than 0',
      (value) => Number(value) > 0
    ),
});
