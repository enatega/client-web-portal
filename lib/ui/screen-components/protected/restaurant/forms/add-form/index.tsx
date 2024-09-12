// Prime React
import { Sidebar } from 'primereact/sidebar';

// Interface and Types
import { IVendorAddFormComponentProps } from '@/lib/utils/interfaces';
import { useContext } from 'react';

import { RestaurantContext } from '@/lib/context/restaurant-context';
import CustomButton from '@/lib/ui/useable-components/button';
import { CustomDropdownComponent } from '@/lib/ui/useable-components/custom-dropdown';
import { CustomMultiSelectComponent } from '@/lib/ui/useable-components/custom-multi-select';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import CustomIconTextField from '@/lib/ui/useable-components/input-icon-field';
import CustomPasswordTextField from '@/lib/ui/useable-components/password-input-field';
import { RestaurantErrors } from '@/lib/utils/constants';
import { dummyCountriesData } from '@/lib/utils/dummy';
import { IRestaurantForm } from '@/lib/utils/interfaces/forms/restaurant.form.interface';
import { onErrorMessageMatcher } from '@/lib/utils/methods/error';
import { RestaurantSchema } from '@/lib/utils/schema/restaurant';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';

const initialValues: IRestaurantForm = {
  name: '',
  username: '',
  password: '',
  confirmPassword: '',
  address: '',
  deliveryTime: '',
  minOrder: 0,
  salesTax: 0.0,
  shopType: null,
  cuisines: [],
};

export default function RestaurantAddForm({
  position = 'right',
}: IVendorAddFormComponentProps) {
  // Context
  const { restaurantFormVisible, onSetRestaurantFormVisible } =
    useContext(RestaurantContext);

  return (
    <Sidebar
      visible={restaurantFormVisible}
      position={position}
      onHide={() => onSetRestaurantFormVisible(false)}
      className="w-full sm:w-[450px]"
    >
      <div className="w-full h-full flex items-center justify-start">
        <div className="h-full w-full">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col mb-2">
              <span className="text-lg">Add Restaurant</span>
            </div>

            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={RestaurantSchema}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  alert(JSON.stringify(values, null, 2));
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
                      <div className="space-y-3 mb-2">
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
                                RestaurantErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>

                        <div>
                          <CustomIconTextField
                            type="email"
                            name="username"
                            placeholder="Email"
                            maxLength={35}
                            showLabel={true}
                            iconProperties={{
                              icon: faEnvelope,
                              position: 'right',
                              style: { marginTop: '1px' },
                            }}
                            value={values.username}
                            onChange={handleChange}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'username',
                                errors?.username,
                                RestaurantErrors
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
                                RestaurantErrors
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
                                RestaurantErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>

                        <div>
                          <CustomTextField
                            placeholder="Address"
                            name="address"
                            type="text"
                            maxLength={20}
                            showLabel={true}
                            value={values.address ?? ''}
                            onChange={handleChange}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'address',
                                errors?.address,
                                RestaurantErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>

                        <div>
                          <CustomTextField
                            placeholder="Delivery Time"
                            name="deliveryTime"
                            type="text"
                            maxLength={20}
                            showLabel={true}
                            value={values.deliveryTime ?? ''}
                            onChange={handleChange}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'deliveryTime',
                                errors?.deliveryTime,
                                RestaurantErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>

                        <div>
                          <CustomTextField
                            placeholder="Min Order"
                            name="minOrder"
                            type="number"
                            maxLength={20}
                            showLabel={true}
                            value={values.minOrder.toString()}
                            onChange={handleChange}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'minOrder',
                                errors?.minOrder,
                                RestaurantErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>
                        <div>
                          <CustomTextField
                            placeholder="Sales Tax"
                            name="salesTax"
                            type="text"
                            maxLength={20}
                            showLabel={true}
                            value={values.salesTax.toString() ?? ''}
                            onChange={handleChange}
                            style={{
                              borderColor: onErrorMessageMatcher(
                                'confirmPassword',
                                errors?.salesTax,
                                RestaurantErrors
                              )
                                ? 'red'
                                : '',
                            }}
                          />
                        </div>
                        <div>
                          <CustomDropdownComponent
                            name="shopType"
                            placeholder="Shop Category"
                            selectedItem={values.shopType}
                            setSelectedItem={setFieldValue}
                            options={dummyCountriesData}
                            showLabel={true}
                          />
                        </div>

                        <div>
                          <CustomMultiSelectComponent
                            name="cuisines"
                            placeholder="Cuisines"
                            options={dummyCountriesData}
                            selectedItems={values.cuisines}
                            setSelectedItems={setFieldValue}
                            showLabel={true}
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
