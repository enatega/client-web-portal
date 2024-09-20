// Core
import { ApolloError, useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';

// Prime React

// Context
import { ToastContext } from '@/lib/context/toast.context';

// Interface and Types
import {
  ICreateVendorResponseGraphQL,
  IGetVendorResponseGraphQL,
  ILazyQueryResult,
} from '@/lib/utils/interfaces';
import { IRestauransVendorDetailsForm } from '@/lib/utils/interfaces/forms';

// Constants and Methods
import { VendorErrors } from '@/lib/utils/constants';
import { onErrorMessageMatcher } from '@/lib/utils/methods/error';

// Components
import CustomButton from '@/lib/ui/useable-components/button';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import CustomIconTextField from '@/lib/ui/useable-components/input-icon-field';
import CustomPasswordTextField from '@/lib/ui/useable-components/password-input-field';

// Schema
import {
  RestaurantsVendorDetails,
  VendorEditSchema,
  VendorSchema,
} from '@/lib/utils/schema';

// GraphQL
import {
  CREATE_VENDOR,
  EDIT_VENDOR,
  GET_VENDOR_BY_ID,
  GET_VENDORS,
} from '@/lib/api/graphql';

// Icons
import { RestaurantsContext } from '@/lib/context/restaurants.context';
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import CustomDropdownComponent from '@/lib/ui/useable-components/custom-dropdown';
import CusstomInputSwitch from '@/lib/ui/useable-components/custom-input-switch';
import { IRestaurantsVendorDetailsComponentProps } from '@/lib/utils/interfaces/restaurants.interface';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const initialValues: IRestauransVendorDetailsForm = {
  _id: null,
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};
export default function VendorDetails({
  stepperProps,
  vendorsDropdown,
}: IRestaurantsVendorDetailsComponentProps) {
  // Props
  const { onStepChange, order } = stepperProps ?? {
    onStepChange: () => {},
    type: '',
    order: -1,
  };
  // Context

  const { showToast } = useContext(ToastContext);
  const { restaurantsVendor, onSetRestaurantsVendor } =
    useContext(RestaurantsContext);

  // States
  const [formInitialValues, setFormValues] =
    useState<IRestauransVendorDetailsForm>({
      ...initialValues,
    });
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Constants
  const isEditingVendor = false;
  const vendorId = '';
  const hiddenClass = isEditingVendor ? 'hidden' : '';

  // API
  // Mutations
  const [createVendor] = useMutation(
    isEditingVendor && vendorId ? EDIT_VENDOR : CREATE_VENDOR,
    {
      refetchQueries: [{ query: GET_VENDORS }],
      onError,
      onCompleted: (data: ICreateVendorResponseGraphQL) => {
        showToast({
          type: 'success',
          title: 'New Vendor',
          message: `Vendor has been ${!showAddForm ? 'selected' : isEditingVendor ? 'edited' : 'added'} successfully`,
          duration: 3000,
        });

        onStepChange(order + 1);
        onSetRestaurantsVendor({
          _id: {
            label: data.createVendor?.email,
            code: data.createVendor?._id,
          },
        });
      },
    }
  );

  const {
    fetch: fetchVendorById,
    loading,
    data,
  } = useLazyQueryQL(GET_VENDOR_BY_ID, {
    enabled: isEditingVendor,
    fetchPolicy: 'network-only',
    debounceMs: 300,
  }) as ILazyQueryResult<IGetVendorResponseGraphQL | undefined, { id: string }>;

  // Handlers
  const onVendorSubmitHandler = async (
    formData: IRestauransVendorDetailsForm
  ) => {
    try {
      if (showAddForm) {
        await createVendor({
          variables: {
            vendorInput: {
              _id: isEditingVendor && vendorId ? vendorId : '',
              email: formData.email,
              password: formData.password,
            },
          },
        });
      } else {
        onSetRestaurantsVendor({
          _id: formData?._id ?? null,
        });
        onStepChange(order + 1);
      }
    } catch (error) {
      showToast({
        type: 'error',
        title: `${!showAddForm ? 'Select' : isEditingVendor ? 'Edit' : 'Create'} Vendor`,
        message: `Vendor ${!showAddForm ? 'Selection' : isEditingVendor ? 'Edit' : 'Create'} Failed`,
        duration: 2500,
      });
    }
  };

  function onError({ graphQLErrors, networkError }: ApolloError) {
    if (!graphQLErrors && !networkError) return;
    showToast({
      type: 'error',
      title: `${!showAddForm ? 'Select' : isEditingVendor ? 'Edit' : 'Create'} Vendor`,
      message:
        graphQLErrors[0]?.message ??
        networkError?.message ??
        `Vendor ${!showAddForm ? 'Selection' : isEditingVendor ? 'Edit' : 'Create'} Failed`,
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

  const onSetVendorIdFormValue = () => {
    if (restaurantsVendor) {
      setFormValues({
        ...formInitialValues,
        _id: restaurantsVendor._id,
      });
    }
  };

  // Use Effects
  useEffect(() => {
    onFetchVendorById();
  }, [isEditingVendor, vendorId]);

  useEffect(() => {
    onHandleSetFormValue();
  }, [data]);

  useEffect(() => {
    onSetVendorIdFormValue();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-start">
      <div className="h-full w-full">
        <div className="flex flex-col gap-2">
          {/*  <div className="flex flex-col mb-2">
            <span className="text-lg">Add Vendor</span>
          </div>
 */}

          <div>
            <Formik
              initialValues={formInitialValues}
              validationSchema={
                isEditingVendor && vendorId
                  ? VendorEditSchema
                  : showAddForm
                    ? VendorSchema
                    : RestaurantsVendorDetails
              }
              enableReinitialize={true}
              onSubmit={async (values) => {
                await onVendorSubmitHandler(values);
              }}
              validateOnChange
            >
              {({
                values,
                errors,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue,
              }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center lg:items-center gap-4">
                        <div className="flex items-center justify-end flex-shrink-0">
                          <CusstomInputSwitch
                            label="Add Vendor"
                            isActive={showAddForm}
                            onChange={() => {
                              if (!showAddForm) {
                                setFieldValue('_id', null);
                              }
                              setShowAddForm((prevState) => !prevState);
                            }}
                          />
                        </div>
                      </div>
                      {!showAddForm ? (
                        <div>
                          <CustomDropdownComponent
                            name="_id"
                            placeholder="Select Vendor"
                            showLabel={true}
                            selectedItem={values._id}
                            setSelectedItem={setFieldValue}
                            options={vendorsDropdown ?? []}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                '_id',
                                errors?._id,
                                VendorErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>
                      ) : (
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
                        </div>
                      )}
                      <div className="flex justify-end mt-4">
                        <CustomButton
                          className="w-fit h-10 bg-black text-white border-gray-300 px-8"
                          label="Save & Next"
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
