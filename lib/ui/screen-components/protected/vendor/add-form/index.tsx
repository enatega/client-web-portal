// Core
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import { useContext } from 'react';

// Prime React
import { Sidebar } from 'primereact/sidebar';

// Context
import { VendorContext } from '@/lib/context/vendor.context';

// Interface and Types
import { IVendorAddFormComponentProps } from '@/lib/utils/interfaces';
import { IVendorForm } from '@/lib/utils/interfaces/forms';

// Constants
import { PasswordErrors, VendorErrors } from '@/lib/utils/constants';

// Components
import CustomButton from '@/lib/ui/useable-components/button';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import CustomIconTextField from '@/lib/ui/useable-components/input-icon-field';
import CustomPasswordTextField from '@/lib/ui/useable-components/password-input-field';

// Methods
import { onErrorMessageMatcher } from '@/lib/utils/methods/error';

// Schema
import { VendorSchema } from '@/lib/utils/schema';

// Icons
import { ToastContext } from '@/lib/context/toast.context';
import {
  faCheck,
  faEnvelope,
  faLock,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

const initialValues: IVendorForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function VendorAddForm({
  position = 'right',
}: IVendorAddFormComponentProps) {
  // Context
  const { vendorFormVisible, onSetVendorFormVisible } =
    useContext(VendorContext);

  const { showToast } = useContext(ToastContext);

  return (
    <Sidebar
      visible={vendorFormVisible}
      position={position}
      onHide={() => onSetVendorFormVisible(false)}
      className="w-full sm:w-[450px]"
    >
      <div className="w-full h-full flex items-center justify-start">
        <div className="h-full w-full">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col mb-2">
              <span className="text-lg">Add Vendor</span>
            </div>

            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={VendorSchema}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  alert(JSON.stringify(values, null, 2));

                  showToast({
                    type: 'error',
                    title: 'New Vendor',
                    message: 'Vendor has been added successfully',
                    duration: 3000,
                  });
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
                  return (
                    <Form onSubmit={handleSubmit}>
                      <div className="space-y-3">
                        <div>
                          <CustomTextField
                            type="text"
                            name="name"
                            placeholder="Name"
                            maxLength={35}
                            value={values.name}
                            onChange={handleChange}
                            showLabel={true}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'name',
                                errors?.name,
                                VendorErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>
                        <div>
                          <CustomIconTextField
                            type="email"
                            name="email"
                            placeholder="Email"
                            maxLength={35}
                            showLabel={true}
                            iconProperties={{
                              icon: faEnvelope,
                              position: 'right',
                              style: { marginTop: '1px' },
                            }}
                            value={values.email}
                            onChange={handleChange}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'email',
                                errors?.email,
                                VendorErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>

                        <div>
                          <CustomPasswordTextField
                            placeholder="Password"
                            name="password"
                            maxLength={20}
                            value={values.password}
                            showLabel={true}
                            iconProperties={{
                              position: 'right',
                            }}
                            onChange={handleChange}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'password',
                                errors?.password,
                                VendorErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>

                        <div>
                          <CustomPasswordTextField
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            maxLength={20}
                            showLabel={true}
                            iconProperties={{
                              position: 'right',
                            }}
                            value={values.confirmPassword ?? ''}
                            onChange={handleChange}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'confirmPassword',
                                errors?.confirmPassword,
                                VendorErrors
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
                            const password = values.password || '';

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
                                  values.password !== '' &&
                                  values.confirmPassword !== '' &&
                                  values.password === values.confirmPassword;
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
