// Prime React
import { Sidebar } from 'primereact/sidebar';

// Interface and Types
import { IVendorForm } from '@/lib/utils/interfaces/forms';

import CustomButton from '@/lib/ui/useable-components/button';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import CustomIconTextField from '@/lib/ui/useable-components/input-icon-field';
import { IRidersAddFormComponentProps } from '@/lib/utils/interfaces/rider.interface';
import { faEnvelope, faEye } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

const initialValues: IVendorForm = {
  vendorName: '',
  vendorEmail: '',
  vendorPassword: '',
  vendorConfirmPassword: '',
};

export default function RiderAddForm({
  position = 'right',
  setIsAddRiderVisible,
  isAddRiderVisible,
}: IRidersAddFormComponentProps) {
  // Prime React

  // Interface and Types

  const [account] = useState<IVendorForm>(initialValues);

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().min(2).max(35).required('Required'),
    vendorName: Yup.string().min(2).max(35).required('Required'),
    vendorEmail: Yup.string().email('Invalid email').required('Required'),
    vendorPassword: Yup.string()
      .min(6, 'At least 6 characters')
      .max(20)
      .test('complexity', function (value: string | undefined) {
        const errors: string[] = [];

        if (!value) return this.createError({});

        if (!/[a-z]/.test(value)) {
          errors.push('At least one lowercase letter (a-z)');
        }
        if (!/[A-Z]/.test(value)) {
          errors.push('At least one uppercase letter (A-Z)');
        }
        if (!/\d/.test(value)) {
          errors.push('At least one number (0-9)');
        }
        if (!/[@$!%*?&]/.test(value)) {
          errors.push('At least one special character');
        }

        if (errors.length) {
          return this.createError({ message: errors.join(', ') });
        }
        return true;
      })
      .required('Required'),
    vendorConfirmPassword: Yup.string()
      .nullable()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Required'),
  });

  return (
    <Sidebar
      visible={isAddRiderVisible}
      position={position}
      onHide={() => setIsAddRiderVisible(false)}
      className="w-full sm:w-[450px]"
    >
      <div className="w-full h-full flex items-center justify-start">
        <div className="h-full">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col mb-2">
              <span className="text-lg">Add Vendor</span>
            </div>

            <div>
              <Formik
                initialValues={account}
                validationSchema={SignupSchema}
                onSubmit={(e) => {
                  console.log(e);
                }}
                validateOnChange
              >
                {({ values, handleChange }) => {
                  return (
                    <Form>
                      <div className="mb-2">
                        <CustomTextField
                          type="text"
                          name="vendorName"
                          placeholder="Name"
                          maxLength={35}
                          value={values.vendorName}
                          onChange={handleChange}
                          showLabel={true}
                          // style={{
                          //   borderColor: onErrorMessageMatcher(
                          //     'email',
                          //     errors?.vendorName
                          //   )
                          //     ? 'red'
                          //     : '',
                          // }}
                        />
                      </div>
                      <div className="mb-2">
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
                          // value={values.vendorEmail}
                          // onChange={handleChange}
                          // style={{
                          //   borderColor: onErrorMessageMatcher(
                          //     'email',
                          //     errors?.vendorEmail
                          //   )
                          //     ? 'red'
                          //     : '',
                          // }}
                        />
                      </div>

                      <div className="mb-2">
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
                          // onChange={handleChange}
                          // style={{
                          //   borderColor: onErrorMessageMatcher(
                          //     'password',
                          //     errors?.vendorPassword
                          //   )
                          //     ? 'red'
                          //     : '',
                          // }}
                        />
                      </div>

                      <div className="mb-2">
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
                          // style={{
                          //   borderColor: onErrorMessageMatcher(
                          //     'confirmPassword',
                          //     errors?.vendorConfirmPassword
                          //   )
                          //     ? 'red'
                          //     : '',
                          // }}
                        />
                      </div>

                      <CustomButton
                        className="w-full h-12 bg-transparent text-black border-gray-300 hover:bg-whit px-32"
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
        </div>
      </div>
    </Sidebar>
  );
}
