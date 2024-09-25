'use client';

// Core
import { useContext } from 'react';

// Formik
import { Form, Formik } from 'formik';

// Prime React
import { Card } from 'primereact/card';

// Interface
import {
  IOwnerLoginDataResponse,
  ISignInForm,
} from '@/lib/utils/interfaces/forms';

// Component
import CustomButton from '@/lib/ui/useable-components/button';
import CustomIconTextField from '@/lib/ui/useable-components/input-icon-field';
import CustomPasswordTextField from '@/lib/ui/useable-components/password-input-field';

// Constants
import { APP_NAME, SignInErrors } from '@/lib/utils/constants';

// Methods
import { onErrorMessageMatcher } from '@/lib/utils/methods/error';

// Icons
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

// GraphQL
import { OWNER_LOGIN } from '@/lib/api/graphql';
import { ToastContext } from '@/lib/context/toast.context';
import { ApolloError, useMutation } from '@apollo/client';

// Schema
import { onUseLocalStorage } from '@/lib/utils/methods';
import { SignInSchema } from '@/lib/utils/schema';
import { useRouter } from 'next/navigation';

const initialValues: ISignInForm = {
  email: '',
  password: '',
};

export default function LoginEmailPasswordMain() {
  // Context
  const { showToast } = useContext(ToastContext);

  // Hooks
  const router = useRouter();

  // API
  const [onLogin, { loading }] = useMutation(OWNER_LOGIN, {
    onError,
    onCompleted,
  });

  // API Handlers
  function onCompleted({ ownerLogin }: IOwnerLoginDataResponse) {
    onUseLocalStorage('save', `user-${APP_NAME}`, JSON.stringify(ownerLogin));
    let redirect_url = '/general/vendors';
    if (ownerLogin?.userType === 'VENDOR') {
      redirect_url = '/general/restaurants';
    }

    router.replace(redirect_url);

    showToast({
      type: 'success',
      title: 'Login',
      message: 'User has been logged in successfully.',
    });
  }
  function onError({ graphQLErrors, networkError }: ApolloError) {
    showToast({
      type: 'error',
      title: 'Login',
      message:
        graphQLErrors[0]?.message ??
        networkError?.message ??
        `Something went wrong. Please try again`,
    });
  }

  // Handler
  const onSubmitHandler = async (data: ISignInForm) => {
    try {
      await onLogin({
        variables: {
          ...data,
        },
      });
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Login',
        message: 'Login Failed',
      });
    }
  };

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
                initialValues={initialValues}
                validationSchema={SignInSchema}
                onSubmit={onSubmitHandler}
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
                              SignInErrors
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>

                      <div className="mb-2">
                        <CustomPasswordTextField
                          className="w-full h-[2.4rem]"
                          placeholder="Password"
                          name="password"
                          maxLength={20}
                          showLabel={false}
                          value={values.password}
                          onChange={handleChange}
                          feedback={false}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'password',
                              errors?.password,
                              SignInErrors
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>

                      <CustomButton
                        className="w-full h-10 px-32 bg-[#18181B] text-white border border-black hover-border-black hover:bg-white hover:text-black"
                        label="Login"
                        type="submit"
                        loading={loading}
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