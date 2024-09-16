// Core

// Prime React
import { Sidebar } from 'primereact/sidebar';

// FontAwesome

// Interface and Types
import { IRidersAddFormComponentProps } from '@/lib/utils/interfaces/rider.interface';

// Components

// Utilities and Constants
// import { PasswordErrors, RiderErrors } from '@/lib/utils/constants';
// import { onErrorMessageMatcher } from '@/lib/utils/methods/error';
// import { RiderSchema } from '@/lib/utils/schema/rider';

// const initialValues: IRiderForm = {
//   riderName: '',
//   riderEmail: '',
//   riderPassword: '',
//   riderConfirmPassword: '',
//   riderPhoneNumber: '',
//   riderZone: null,
// };

export default function RiderAddForm({
  position = 'right',
  setIsAddRiderVisible,
  isAddRiderVisible,
}: IRidersAddFormComponentProps) {
  // Prime React

  // Interface and Types

  // const [account] = useState<IVendorForm>(initialValues);

  // const SignupSchema = Yup.object().shape({
  //   firstName: Yup.string().min(2).max(35).required('Required'),
  //   vendorName: Yup.string().min(2).max(35).required('Required'),
  //   vendorEmail: Yup.string().email('Invalid email').required('Required'),
  //   vendorPassword: Yup.string()
  //     .min(6, 'At least 6 characters')
  //     .max(20)
  //     .test('complexity', function (value: string | undefined) {
  //       const errors: string[] = [];

  //       if (!value) return this.createError({});

  //       if (!/[a-z]/.test(value)) {
  //         errors.push('At least one lowercase letter (a-z)');
  //       }
  //       if (!/[A-Z]/.test(value)) {
  //         errors.push('At least one uppercase letter (A-Z)');
  //       }
  //       if (!/\d/.test(value)) {
  //         errors.push('At least one number (0-9)');
  //       }
  //       if (!/[@$!%*?&]/.test(value)) {
  //         errors.push('At least one special character');
  //       }

  //       if (errors.length) {
  //         return this.createError({ message: errors.join(', ') });
  //       }
  //       return true;
  //     })
  //     .required('Required'),
  //   vendorConfirmPassword: Yup.string()
  //     .nullable()
  //     .oneOf([Yup.ref('password'), null], 'Password must match')
  //     .required('Required'),
  // });

  return (
    <Sidebar
      visible={isAddRiderVisible}
      position={position}
      onHide={() => setIsAddRiderVisible(false)}
      className="w-full sm:w-[450px]"
    >
      {/* <div className="w-full h-full flex items-center justify-start">
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
                            name="riderName"
                            placeholder="Name"
                            maxLength={35}
                            value={values.riderName}
                            onChange={handleChange}
                            showLabel={true}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'email',
                                errors?.riderName,
                                RiderErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>
                        <div>
                          <CustomIconTextField
                            type="email"
                            name="riderEmail"
                            placeholder="Email"
                            maxLength={35}
                            showLabel={true}
                            iconProperties={{
                              icon: faEnvelope,
                              position: 'right',
                            }}
                            value={values.riderEmail}
                            onChange={handleChange}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'email',
                                errors?.riderEmail,
                                RiderErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>

                        <div>
                          <CustomIconTextField
                            placeholder="Password"
                            name="riderPassword"
                            type="password"
                            maxLength={20}
                            value={values.riderPassword}
                            showLabel={true}
                            iconProperties={{
                              icon: faEye,
                              position: 'right',
                            }}
                            onChange={handleChange}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'password',
                                errors?.riderPassword,
                                RiderErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>

                        <div>
                          <CustomIconTextField
                            placeholder="Confirm Password"
                            name="riderConfirmPassword"
                            type="password"
                            maxLength={20}
                            showLabel={true}
                            iconProperties={{
                              icon: faEye,
                              position: 'right',
                            }}
                            value={values.riderConfirmPassword ?? ''}
                            onChange={handleChange}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'confirmPassword',
                                errors?.riderConfirmPassword,
                                RiderErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>

                      <CustomButton
                        className="w-full h-12 bg-transparent text-black border-gray-300 hover:bg-whit px-32"
                        label="Add"
                        rounded={true}
                        icon="pi pi-google"
                        type="submit"
                      />
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
