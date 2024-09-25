'use client';

// Core
import { useState } from 'react';
import * as Yup from 'yup';

// Formik
import { Form, Formik } from 'formik';

// Prime React
import { Card } from 'primereact/card';

// Interface
import { ISignUpForm } from '@/lib/utils/interfaces/forms';

// Component
import CustomButton from '@/lib/ui/useable-components/button';
import CustomIconTextField from '@/lib/ui/useable-components/input-icon-field';

// Constants
import { SignUpErrors } from '@/lib/utils/constants';

// Methods
import { onErrorMessageMatcher } from '@/lib/utils/methods/error';

// Icons
import CustomPasswordTextField from '@/lib/ui/useable-components/password-input-field';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const initialValues: ISignUpForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function LoginEmailPasswordMain() {
  const [account] = useState<ISignUpForm>(initialValues);

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <div className="h-full w-screen flex items-center justify-center">
      <div className="w-full md:w-1/2 lg:w-[30%]">
        <Card>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center mb-2 p-2 gap-y-[0.5rem]">
              <span className="text-3xl font-semibold font-inter text-center">
                Login to your account
              </span>
              <span className="text-[#667085] text-base font-normal font-inter text-center">
                Welcome back! Please enter your details.
              </span>
            </div>

            <div>
              <Formik
                initialValues={account}
                validationSchema={SignupSchema}
                onSubmit={() => {}}
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
                            style: {
                              marginTop: '-10px',
                            },
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
                        <CustomPasswordTextField
                          className="w-full"
                          placeholder="Password"
                          name="password"
                          maxLength={20}
                          showLabel={false}
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
                        className="w-full h-10 bg-[#18181B] text-white border border-transparent hover-border-black hover:bg-white hover:text-black"
                        label="Login"
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
