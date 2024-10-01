'use client';

// Core
import { Form, Formik } from 'formik';
import { useState } from 'react';

// Interface and Types
import {
  IRestaurantsRestaurantLocationComponentProps,
  IVendorForm,
} from '@/lib/utils/interfaces';

// Icons
import UpdateRestaurantLocationBounds from '@/lib/ui/useable-components/google-maps/location-bounds-profile-restaurants';

const initialValues: IVendorForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function UpdateRestaurantLocation({
  stepperProps,
}: IRestaurantsRestaurantLocationComponentProps) {
  const { onStepChange } = stepperProps ?? {
    onStepChange: () => {},
  };

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
              {({ handleSubmit }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <div className="space-y-3 mb-2 ">
                      <UpdateRestaurantLocationBounds
                        onStepChange={onStepChange}
                      />
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

