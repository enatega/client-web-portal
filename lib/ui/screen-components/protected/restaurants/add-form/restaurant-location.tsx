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
import CustomButton from '@/lib/ui/useable-components/button';
import { IRestaurantsRestaurantLocationComponentProps } from '@/lib/utils/interfaces/restaurants.interface';

const initialValues: IVendorForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function RestaurantLocation({
  stepperProps,
}: IRestaurantsRestaurantLocationComponentProps) {
  // Props
  const { onStepChange, order, isLastStep } = stepperProps ?? {
    onStepChange: () => {},
    type: '',
    order: -1,
    isLastStep: false,
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
              {({
                //    values,
                //    errors,
                //    handleChange,
                handleSubmit,
                isSubmitting,
              }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <div className="space-y-3 mb-2">
                      <div className="flex justify-between mt-4">
                        <CustomButton
                          className="w-fit h-10 bg-black text-white border-gray-300 px-8"
                          label="Back"
                          type="button"
                          onClick={() => onStepChange(order - 1)}
                        />
                        <CustomButton
                          className="w-fit h-10 bg-black text-white border-gray-300 px-8"
                          label={isLastStep ? 'Save' : 'Next'}
                          type="submit"
                          loading={isSubmitting}
                        />
                      </div>
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
