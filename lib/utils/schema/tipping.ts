import * as Yup from 'yup';

export const TippingSchema = Yup.object()
  .shape({
    tip1: Yup.number().required('Tip 1 is required'),
    tip2: Yup.number().required('Tip 2 is required'),
    tip3: Yup.number().required('Tip 3 is required'),
  })
  .test(
    'unique-tips',
    'Tips must not be the same or equal to each other',
    function (value) {
      const { tip1, tip2, tip3 } = value || {}; // Ensure value is defined

      // If values are undefined, return true (skip validation)
      if (tip1 === undefined || tip2 === undefined || tip3 === undefined)
        return true;

      // Check if all tips are the same
      const allSame = tip1 === tip2 && tip2 === tip3;

      // Check if any two tips are equal
      const anyEqual = tip1 === tip2 || tip1 === tip3 || tip2 === tip3;
      return !(allSame || anyEqual);
    }
  );
