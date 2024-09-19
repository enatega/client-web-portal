// Core
import { Form, Formik, FormikHelpers } from 'formik';

// Prime React
import { Sidebar } from 'primereact/sidebar';

// Interface and Types
import { IQueryResult } from '@/lib/utils/interfaces';
import { IRiderForm } from '@/lib/utils/interfaces/forms';
import {
  IRidersAddFormComponentProps,
  IZonesResponse,
} from '@/lib/utils/interfaces/rider.interface';

// Components
import CustomButton from '@/lib/ui/useable-components/button';
import CustomDropdownComponent from '@/lib/ui/useable-components/custom-dropdown';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import CustomNumberField from '@/lib/ui/useable-components/number-input-field';
import CustomPasswordTextField from '@/lib/ui/useable-components/password-input-field';

// Utilities and Constants
import { RiderErrors } from '@/lib/utils/constants';
import { onErrorMessageMatcher } from '@/lib/utils/methods/error';
import { RiderSchema } from '@/lib/utils/schema/rider';

//Toast
import useToast from '@/lib/hooks/useToast';

//GraphQL
import { getRiders, getZones } from '@/lib/api/graphql';
import { createRider, editRider } from '@/lib/api/graphql/mutation';
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import { gql, useMutation } from '@apollo/client';

const GET_RIDERS = gql`
  ${getRiders}
`;

const CREATE_RIDER = gql`
  ${createRider}
`;

const EDIT_RIDER = gql`
  ${editRider}
`;

const GET_ZONES = gql`
  ${getZones}
`;

export default function RiderAddForm({
  onHide,
  rider,
  position = 'right',
  isAddRiderVisible,
}: IRidersAddFormComponentProps) {
  // State
  const initialValues: IRiderForm = {
    name: '',
    username: '',
    password: '',
    ...rider,
    confirmPassword: rider?.password ?? '',
    phone: rider ? +rider.phone : null,
    zone: rider ? { label: rider.zone.title, code: rider.zone._id } : null,
  };

  // Hooks
  const { showToast } = useToast();

  // Query
  const { data } = useQueryGQL(GET_ZONES, {
    fetchPolicy: 'cache-and-network',
  }) as IQueryResult<IZonesResponse | undefined, undefined>;

  // Mutation
  const mutation = rider ? EDIT_RIDER : CREATE_RIDER;
  const [mutate, { loading: mutationLoading }] = useMutation(mutation, {
    refetchQueries: [{ query: GET_RIDERS }],
  });

  // Form Submission
  const handleSubmit = (
    values: IRiderForm,
    { resetForm }: FormikHelpers<IRiderForm>
  ) => {
    if (data) {
      mutate({
        variables: {
          riderInput: {
            _id: rider ? rider._id : '',
            name: values.name,
            username: values.username,
            password: values.password,
            phone: values.phone?.toString(),
            zone: values.zone?.code,
            available: rider ? rider.available : true,
          },
        },
        onCompleted: () => {
          showToast({
            type: 'success',
            title: 'Success!',
            message: rider ? 'Rider updated' : 'Rider added',
            duration: 3000,
          });
          resetForm();
          onHide();
        },
        onError: (error) => {
          let message = '';
          try {
            message = error.graphQLErrors[0].message;
          } catch (err) {
            message = 'ActionFailedTryAgain';
          }
          showToast({
            type: 'error',
            title: 'Error!',
            message,
            duration: 3000,
          });
        },
      });
    }
  };

  return (
    <Sidebar
      visible={isAddRiderVisible}
      position={position}
      onHide={onHide}
      className="w-full sm:w-[450px]"
    >
      {/* <div className="w-full h-full flex items-center justify-start">
        <div className="h-full">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col mb-2">
              <span className="text-lg">{rider ? 'Edit' : 'Add'} Rider</span>
            </div>

            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={RiderSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({
                  values,
                  errors,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                }) => {
                  return (
                    <Form onSubmit={handleSubmit}>
                      <div className="space-y-4">
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
                                RiderErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>
                        <div>
                          <CustomTextField
                            type="text"
                            name="username"
                            placeholder="username"
                            maxLength={35}
                            value={values.username}
                            onChange={handleChange}
                            showLabel={true}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'username',
                                errors?.username,
                                RiderErrors
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
                            onChange={handleChange}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'password',
                                errors?.password,
                                RiderErrors
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
                            value={values.confirmPassword ?? ''}
                            onChange={handleChange}
                            feedback={false}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'confirmPassword',
                                errors?.confirmPassword,
                                RiderErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>

                        <div>
                          <CustomDropdownComponent
                            placeholder="Zone"
                            options={
                              data?.zones.map((val) => {
                                return { label: val.title, code: val._id };
                              }) || []
                            }
                            showLabel={true}
                            name="zone"
                            selectedItem={values.zone}
                            setSelectedItem={setFieldValue}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'zone',
                                errors?.zone,
                                RiderErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>

                        <div>
                          <CustomNumberField
                            min={0}
                            placeholder="Phone Number"
                            name="phone"
                            showLabel={true}
                            value={values.phone}
                            useGrouping={false}
                            onChange={setFieldValue}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'phone',
                                errors?.phone,
                                RiderErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>

                        <div className="flex justify-end mt-4">
                          <CustomButton
                            className="w-fit h-10 bg-black text-white border-gray-300 px-8"
                            label={rider ? 'Update' : 'Add'}
                            type="submit"
                            loading={mutationLoading}
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
      </div> */}
    </Sidebar>
  );
}
