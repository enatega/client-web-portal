// Core
import { Form, Formik } from 'formik';
import { useState } from 'react';

// Prime React

// Context

// Interface and Types
import { IVendorForm } from '@/lib/utils/interfaces/forms';

// Constants and Methods

// Components

// Schema

// GraphQL

// Icons
import CustomGoogleMapsLocationBounds from '@/lib/ui/useable-components/google-maps/location-bounds';

const initialValues: IVendorForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function RestaurantLocation() {
  // States
  const [formInitialValues] = useState<IVendorForm>({
    ...initialValues,
  });

  return (
    <div className="w-full h-full flex items-center justify-start">
      <div className="h-full w-full">
        <div className="flex flex-col gap-2">
          <div>
            <Formik
              initialValues={formInitialValues}
              validationSchema={null}
              enableReinitialize={true}
              onSubmit={() => {}}
              validateOnChange
            >
              {({
                //    values,
                //    errors,
                //    handleChange,
                handleSubmit,
                // isSubmitting,
              }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <div className="space-y-3 mb-2 ">
                      <CustomGoogleMapsLocationBounds />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
