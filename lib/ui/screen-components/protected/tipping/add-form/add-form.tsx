'use client';

// Interface and Types
import { ITippingsForm } from '@/lib/utils/interfaces';

// Schema
import { TippingSchema } from '@/lib/utils/schema/tipping';

// Components
import CustomButton from '@/lib/ui/useable-components/button';
import CustomNumberTextField from '../custom-input';

//Formik
import { Form, Formik } from 'formik';

const TippingAddForm = () => {
  const initialValues: ITippingsForm = {
    tip1: '',
    tip2: '',
    tip3: '',
  };

  return (
    <div className="py-14 px-8 rounded bg-[#F4F4F5] mt-11">
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={TippingSchema}
          onSubmit={(e) => {
            console.log(e);
          }}
          validateOnChange
        >
          {({ values, errors, touched, handleChange }) => {
            return (
              <Form className="grid grid-cols-2 gap-3 items-end sm:grid-cols-4">
                <CustomNumberTextField
                  type="number"
                  name="tip1"
                  placeholder="Tip 1 e.g 10"
                  maxLength={35}
                  value={values.tip1}
                  onChange={handleChange}
                  showLabel={true}
                  style={{
                    borderColor: errors?.tip1 && touched.tip1 ? 'red' : '',
                  }}
                />
                <CustomNumberTextField
                  type="number"
                  name="tip2"
                  placeholder="Tip 2 e.g 20"
                  maxLength={35}
                  showLabel={true}
                  value={values.tip2}
                  onChange={handleChange}
                  style={{
                    borderColor: errors.tip2 && touched.tip2 ? 'red' : '',
                  }}
                />
                <CustomNumberTextField
                  type="number"
                  name="tip3"
                  placeholder="Tip 2 e.g 20"
                  maxLength={35}
                  showLabel={true}
                  value={values.tip3}
                  onChange={handleChange}
                  style={{
                    borderColor: errors.tip3 && touched.tip3 ? 'red' : '',
                  }}
                />
                <CustomButton
                  className="h-12 text-white border-gray-300 bg-[black]"
                  label="Add"
                  rounded={true}
                  icon="pi pi-google"
                  type="submit"
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default TippingAddForm;
