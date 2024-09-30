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
import CustomGoogleMapsLocationBounds from '@/lib/ui/useable-components/google-maps/location-bounds-restaurant(vendor)';

const initialValues: IVendorForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function RestaurantLocation({
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
    <div className="flex h-full w-full items-center justify-start">
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
                    <div className="mb-2 space-y-3">
                      <CustomGoogleMapsLocationBounds
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
