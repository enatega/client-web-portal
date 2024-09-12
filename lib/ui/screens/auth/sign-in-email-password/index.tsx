'use client';

import CustomButton from '@/lib/ui/useable-components/button';

// Formik
import { Form, Formik } from 'formik';

// Prime React
import { Card } from 'primereact/card';

// Interface
import { ISignUpForm } from '@/lib/utils/interfaces/forms';

import CustomIconTextField from '@/lib/ui/useable-components/input-icon-field';
import { SignUpErrors } from '@/lib/utils/constants';
import { onErrorMessageMatcher } from '@/lib/utils/methods/error';
import { faEnvelope, faEye } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import * as Yup from 'yup';

const initialValues: ISignUpForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function LoginEmailPasswordScreen() {
  const [account] = useState<ISignUpForm>(initialValues);

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-2/6">
        <Card>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col mb-2 p-2">
              <span className="text-2xl">Please login</span>
              <span className="text-gray-400 text-sm">
                First, let&apos;s create your Enatega account
              </span>
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
                {({ values, errors, handleChange }) => {
                  return (
                    <Form>
                      <div className="mb-2">
                        <CustomIconTextField
                          placeholder="Email"
                          name="email"
                          type="email"
                          maxLength={35}
                          value={values.email}
                          iconProperties={{
                            icon: faEnvelope,
                            position: 'right',
                          }}
                          showLabel={false}
                          onChange={handleChange}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'email',
                              errors?.email,
                              SignUpErrors
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>

                      <div className="mb-2">
                        <CustomIconTextField
                          className="w-full"
                          placeholder="Password"
                          name="password"
                          type="password"
                          maxLength={20}
                          showLabel={false}
                          iconProperties={{
                            icon: faEye,
                            position: 'right',
                          }}
                          value={values.password}
                          onChange={handleChange}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'password',
                              errors?.password,
                              SignUpErrors
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>

                      <CustomButton
                        className="w-full h-12 bg-primary-color text-white border-primary-color hover:bg-white hover:text-primary-color"
                        label="Login"
                        rounded={true}
                        type="submit"
                      />
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
