// Prime React
import { Sidebar } from 'primereact/sidebar';

// Interface and Types
import { IVendorAddFormComponentProps } from '@/lib/utils/interfaces';
import { IVendorForm } from '@/lib/utils/interfaces/forms';
import { useContext } from 'react';

import { RestaurantContext } from '@/lib/context/restaurant-context';
import CustomButton from '@/lib/ui/useable-components/button';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import CustomIconTextField from '@/lib/ui/useable-components/input-icon-field';
import { PasswordErrors } from '@/lib/utils/constants';
import { onErrorMessageMatcher } from '@/lib/utils/methods/error';
import { VendorSchema } from '@/lib/utils/schema';
import {
  faCheck,
  faEnvelope,
  faEye,
  faLock,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';

const initialValues: IVendorForm = {
  vendorName: '',
  vendorEmail: '',
  vendorPassword: '',
  vendorConfirmPassword: '',
};

export default function RestaurantAddForm({
  position = 'right',
}: IVendorAddFormComponentProps) {
  // Context
  const { restaurantFormVisible, onSetRestaurantFormVisible } =
    useContext(RestaurantContext);

  return (
    <Sidebar
      visible={restaurantFormVisible}
      position={position}
      onHide={() => onSetRestaurantFormVisible(false)}
      className="w-full sm:w-[450px]"
    >
      <div className="w-full h-full flex items-center justify-start">
        <div className="h-full w-full">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col mb-2">
              <span className="text-lg">Add Restaurant</span>
            </div>

            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={VendorSchema}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  alert(JSON.stringify(values, null, 2));
                }}
                validateOnChange
              >
                {({
                  values,
                  errors,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                }) => {
                  console.log({ errors });

                  return (
                    <Form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <div>
                          <CustomTextField
                            type="text"
                            name="vendorName"
                            placeholder="Name"
                            maxLength={35}
                            value={values.vendorName}
                            onChange={handleChange}
                            showLabel={true}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'email',
                                errors?.vendorName
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>

                        <div>
                          <CustomIconTextField
                            type="email"
                            name="vendorEmail"
                            placeholder="Email"
                            maxLength={35}
                            showLabel={true}
                            iconProperties={{
                              icon: faEnvelope,
                              position: 'right',
                            }}
                            value={values.vendorEmail}
                            onChange={handleChange}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'email',
                                errors?.vendorEmail
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>

                        <div>
                          <CustomIconTextField
                            placeholder="Password"
                            name="vendorPassword"
                            type="password"
                            maxLength={20}
                            value={values.vendorPassword}
                            showLabel={true}
                            iconProperties={{
                              icon: faEye,
                              position: 'right',
                            }}
                            onChange={handleChange}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'password',
                                errors?.vendorPassword
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>

                        <div>
                          <CustomIconTextField
                            placeholder="Confirm Password"
                            name="vendorConfirmPassword"
                            type="password"
                            maxLength={20}
                            showLabel={true}
                            iconProperties={{
                              icon: faEye,
                              position: 'right',
                            }}
                            value={values.vendorConfirmPassword ?? ''}
                            onChange={handleChange}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'confirmPassword',
                                errors?.vendorConfirmPassword
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>

                        <div className="flex flex-col items-start justify-start gap-2 mb-2 p-2">
                          <div className="w-full border-b pb-2">
                            <FontAwesomeIcon icon={faLock} className="mr-2" />
                            <b>Password Strength</b>
                          </div>

                          {PasswordErrors.map((pmessage, index) => {
                            const password = values.vendorPassword || '';

                            let isResolved = false;
                            switch (index) {
                              case 0: // At least 6 characters
                                isResolved = password.length >= 6;
                                break;
                              case 1: // At least one lowercase letter
                                isResolved = /[a-z]/.test(password);
                                break;
                              case 2: // At least one uppercase letter
                                isResolved = /[A-Z]/.test(password);
                                break;
                              case 3: // At least one number
                                isResolved = /[0-9]/.test(password);
                                break;
                              case 4: // At least one special character
                                isResolved = /[!@#$%^&*(),.?":{}|<>]/.test(
                                  password
                                );
                                break;
                              case 5: // At least one special character
                                isResolved =
                                  values.vendorPassword !== '' &&
                                  values.vendorConfirmPassword !== '' &&
                                  values.vendorPassword ===
                                    values.vendorConfirmPassword;
                                break;
                            }

                            const className = isResolved
                              ? 'text-green-500'
                              : 'text-gray-500';

                            return (
                              <div
                                key={index}
                                className={`${className} text-sm`}
                              >
                                <FontAwesomeIcon
                                  icon={isResolved ? faCheck : faTimes}
                                  className="mr-2"
                                />
                                <span>{pmessage}</span>
                              </div>
                            );
                          })}
                        </div>

                        <div className="flex justify-end mt-4">
                          <CustomButton
                            className="w-fit h-10 bg-black text-white border-gray-300 px-8"
                            label="Add"
                            type="submit"
                            loading={isSubmitting}

                            // onClick={() => {}}
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
    </Sidebar>
  );
}
