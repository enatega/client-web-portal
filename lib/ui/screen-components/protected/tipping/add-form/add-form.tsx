'use client';

// Interface and Types
// import { ITippingsForm } from '@/lib/utils/interfaces';

// Schema

// Components
import CustomButton from '@/lib/ui/useable-components/button';
// import CustomNumberTextField from '../custom-input';

//Formik
import { ITippingsForm } from '@/lib/utils/interfaces/forms/tippings.form.interface';
import { Form, Formik } from 'formik';
import { useState } from 'react';

const TippingAddForm = () => {
  const initialValues = {
    tip1: '',
    tip2: '',
    tip3: '',
  };

  const [account] = useState<ITippingsForm>(initialValues);

  return (
    <div className="py-14 px-8 rounded bg-[#F4F4F5] mt-11">
      <div>
        <Formik
          initialValues={account}
          // validationSchema={SignupSchema}
          onSubmit={(e) => {
            console.log(e);
          }}
          validateOnChange
        >
          {({ values, handleChange }) => {
            console.log({ values, handleChange });
            return (
              <Form className="grid grid-cols-4 gap-3 items-end">
                {/* <CustomNumberTextField
                  type="text"
                  name="tip2"
                  placeholder="Tip 1 e.g 10"
                  maxLength={35}
                  value={values.tip1}
                  onChange={handleChange}
                  showLabel={true}
                  iconProperties={{
                    icon: faEnvelope,
                    position: 'right',
                  }}
                  // style={{
                  //   borderColor: onErrorMessageMatcher('email', errors?.tip1)
                  //     ? 'red'
                  //     : '',
                  // }}
                /> */}
                {/* <CustomNumberTextField
                  type="email"
                  name="tip2"
                  placeholder="Tip 2 e.g 20"
                  maxLength={35}
                  showLabel={true}
                  iconProperties={{
                    icon: faEnvelope,
                    position: 'right',
                  }}
                  value={values.tip2}
                  onChange={handleChange}
                  // style={{
                  //   borderColor: onErrorMessageMatcher('email', errors?.tip2)
                  //     ? 'red'
                  //     : '',
                  // }}
                /> */}
                {/* <CustomNumberTextField
                  type="email"
                  name="tip2"
                  placeholder="Tip 2 e.g 20"
                  maxLength={35}
                  showLabel={true}
                  iconProperties={{
                    icon: faEnvelope,
                    position: 'right',
                  }}
                  value={values.tip2}
                  onChange={handleChange}
                  // style={{
                  //   borderColor: onErrorMessageMatcher('email', errors?.tip2)
                  //     ? 'red'
                  //     : '',
                  // }}
                /> */}

                <CustomButton
                  className="h-12  text-white border-gray-300 bg-[black] px-28"
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
