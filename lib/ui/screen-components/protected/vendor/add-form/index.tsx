// Core
import { ApolloError, useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';

// Prime React
import { Sidebar } from 'primereact/sidebar';

// Context
import { ToastContext } from '@/lib/context/toast.context';
import { VendorContext } from '@/lib/context/vendor.context';

// Interface and Types
import {
  IGetVendorResponseGraphQL,
  ILazyQueryResult,
  IVendorAddFormComponentProps,
} from '@/lib/utils/interfaces';
import { IVendorForm } from '@/lib/utils/interfaces/forms';

// Constants and Methods
import { VendorErrors } from '@/lib/utils/constants';
import { onErrorMessageMatcher } from '@/lib/utils/methods/error';

// Components
import CustomButton from '@/lib/ui/useable-components/button';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import CustomIconTextField from '@/lib/ui/useable-components/input-icon-field';
import CustomPasswordTextField from '@/lib/ui/useable-components/password-input-field';

// Schema
import { VendorEditSchema, VendorSchema } from '@/lib/utils/schema';

// GraphQL
import {
  CREATE_VENDOR,
  EDIT_VENDOR,
  GET_VENDOR_BY_ID,
} from '@/lib/api/graphql';

// Icons
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

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
  const {
    vendorFormVisible,
    onSetVendorFormVisible,
    vendorId,
    isEditingVendor,
    vendorResponse,
  } = useContext(VendorContext);
  const { showToast } = useContext(ToastContext);

  // States
  const [formInitialValues, setFormValues] = useState<IVendorForm>({
    ...initialValues,
  });

  // Constants
  const hiddenClass = isEditingVendor ? 'hidden' : '';

  // API
  // Mutations
  const [createVendor] = useMutation(
    isEditingVendor && vendorId ? EDIT_VENDOR : CREATE_VENDOR,
    {
      //  refetchQueries: [{ query: GET_VENDORS, fetchPolicy: 'network-only' }],
      onError,
      onCompleted: () => {
        vendorResponse.refetch();
      },
    }
  );

  const {
    fetch: fetchVendorById,
    loading,
    data,
  } = useLazyQueryQL(GET_VENDOR_BY_ID, {
    fetchPolicy: 'network-only',
    debounceMs: 300,
  }) as ILazyQueryResult<IGetVendorResponseGraphQL | undefined, { id: string }>;

  // Handlers
  const onVendorCreate = async (data: IVendorForm) => {
    try {
      await createVendor({
        variables: {
          vendorInput: {
            _id: isEditingVendor && vendorId ? vendorId : '',
            email: data.email,
            password: data.password,
          },
        },
      });

      showToast({
        type: 'success',
        title: 'New Vendor',
        message: `Vendor has been ${isEditingVendor ? 'edited' : 'added'} successfully`,
        duration: 3000,
      });

      onSetVendorFormVisible(false);
    } catch (error) {
      showToast({
        type: 'error',
        title: `${isEditingVendor ? 'Edit' : 'Create'} Vendor`,
        message: `Vendor ${isEditingVendor ? 'Edit' : 'Create'} Failed`,
        duration: 2500,
      });
    }
  };

  function onError({ graphQLErrors, networkError }: ApolloError) {
    showToast({
      type: 'error',
      title: `${isEditingVendor ? 'Edit' : 'Create'} Vendor`,
      message:
        graphQLErrors[0]?.message ??
        networkError?.message ??
        `Vendor ${isEditingVendor ? 'Edit' : 'Create'} Failed`,
      duration: 2500,
    });
  }

  const onFetchVendorById = () => {
    setFormValues(initialValues);
    if (isEditingVendor && vendorId) {
      fetchVendorById({ id: vendorId ?? '' });
    }
  };

  const onHandleSetFormValue = () => {
    if (!data) return;

    setFormValues((prevState) => ({
      ...initialValues,
      ...prevState,
      email: data?.getVendor?.email ?? '',
    }));
  };
  // Use Effects
  useEffect(() => {
    onFetchVendorById();
  }, [isEditingVendor, vendorId]);

  useEffect(() => {
    onHandleSetFormValue();
  }, [data]);

  return (
    <Sidebar
      visible={vendorFormVisible}
      position={position}
      onHide={() => onSetVendorFormVisible(false, false)}
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
                initialValues={formInitialValues}
                validationSchema={
                  isEditingVendor && vendorId ? VendorEditSchema : VendorSchema
                }
                enableReinitialize={true}
                onSubmit={async (values) => {
                  await onVendorCreate(values);
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
                        <div className={`${hiddenClass}`}>
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
                            isLoading={loading}
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

                        <div className={`${hiddenClass}`}>
                          <CustomPasswordTextField
                            placeholder="Password"
                            name="password"
                            maxLength={20}
                            value={values.password}
                            showLabel={true}
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

                        <div className={`${hiddenClass}`}>
                          <CustomPasswordTextField
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            maxLength={20}
                            showLabel={true}
                            value={values.confirmPassword ?? ''}
                            onChange={handleChange}
                            feedback={false}
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

                        <div className="flex justify-end mt-4">
                          <CustomButton
                            className="w-fit h-10 bg-black text-white border-gray-300 px-8"
                            label="Add"
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
    </Sidebar>
  );
}
