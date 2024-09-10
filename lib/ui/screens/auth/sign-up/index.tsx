'use client';

import CustomButton from '@/lib/ui/useable-components/button';
import CusomtTextField from '@/lib/ui/useable-components/input-field';
import CustomIconTextField from '@/lib/ui/useable-components/input-icon-field';
import { PasswordErrors } from '@/lib/utils/constants/strings';
// Formik

// Prime React

// Interface
import { ISignUpForm } from '@/lib/utils/interfaces/forms';
import { onErrorMessageMatcher } from '@/lib/utils/methods/error';
import { faEnvelope, faEye } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

import { useState } from 'react';
import * as Yup from 'yup';

const initialValues: ISignUpForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function SignupScreen() {
  const [account] = useState<ISignUpForm>(initialValues);

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().min(2).max(35).required('Required'),
    lastName: Yup.string().min(2).max(35).required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
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
    confirmPassword: Yup.string()
      .nullable()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Required'),
  });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="h-full xlg:w-1/6 lg:w-2/6 md:w-3/6 sm:w-full">
        <Card className="w-full">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col mb-2 p-2">
              <span className="text-2xl">Let&apos;s get started!</span>
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
                        <CusomtTextField
                          type="text"
                          className="w-full"
                          placeholder="First Name"
                          name="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          maxLength={35}
                          showLabel={false}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'firstName',
                              errors?.firstName
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>

                      <div className="mb-2">
                        <CusomtTextField
                          type="text"
                          placeholder="Last Name"
                          name="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          maxLength={35}
                          showLabel={false}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'lastName',
                              errors?.lastName
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>

                      <div className="mb-2">
                        <CustomIconTextField
                          type="email"
                          name="email"
                          placeholder="Email"
                          maxLength={35}
                          iconProperties={{
                            icon: faEnvelope,
                            position: 'right',
                          }}
                          showLabel={false}
                          value={values.email}
                          onChange={handleChange}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'email',
                              errors?.email
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>

                      <div className="mb-2">
                        <CustomIconTextField
                          placeholder="Password"
                          name="password"
                          type="password"
                          maxLength={20}
                          value={values.password}
                          iconProperties={{
                            icon: faEye,
                            position: 'right',
                          }}
                          showLabel={false}
                          onChange={handleChange}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'password',
                              errors?.password
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>

                      <div className="mb-2">
                        <CustomIconTextField
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          type="password"
                          maxLength={20}
                          iconProperties={{
                            icon: faEye,
                            position: 'right',
                          }}
                          showLabel={false}
                          value={values.confirmPassword}
                          onChange={handleChange}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'confirmPassword',
                              errors?.confirmPassword
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>

                      <div className="flex flex-col gap-2 mb-2 p-2">
                        <Divider align="left" className="m-0">
                          <div className="inline-flex align-items-center">
                            <i className="pi pi-lock mr-2"></i>
                            <b>Password Strength</b>
                          </div>
                        </Divider>

                        {PasswordErrors.map((pmessage, index) => {
                          return (
                            <div
                              key={index}
                              className={`${errors.password?.includes(pmessage) ? 'text-red-500' : 'text-gray-500'}  text-sm`}
                            >
                              <i className="pi pi-times mr-2" />
                              <span>{pmessage}</span>
                            </div>
                          );
                        })}
                      </div>

                      <CustomButton
                        className="w-full h-12 bg-transparent text-black border-gray-300 hover:bg-whit px-32"
                        label="Create Account"
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
        </Card>
      </div>
    </div>
  );
}
