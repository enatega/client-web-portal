import React, { useContext, useMemo } from 'react';
import { Form, Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { ProfileContext } from '@/lib/context/profile.context';
import { ToastContext } from '@/lib/context/toast.context';

import CustomButton from '@/lib/ui/useable-components/button';
import CustomDropdownComponent from '@/lib/ui/useable-components/custom-dropdown';
import CustomMultiSelectComponent from '@/lib/ui/useable-components/custom-multi-select';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import CustomIconTextField from '@/lib/ui/useable-components/input-icon-field';
import CustomPasswordTextField from '@/lib/ui/useable-components/password-input-field';
import CustomNumberField from '@/lib/ui/useable-components/number-input-field';
import CustomUploadImageComponent from '@/lib/ui/useable-components/upload/upload-image';

import { ProfileErrors, SHOP_TYPE } from '@/lib/utils/constants';
import { RestaurantSchema } from '@/lib/utils/schema/restaurant';
import { EDIT_RESTAURANT, GET_CUISINES } from '@/lib/api/graphql';
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import { onErrorMessageMatcher, toTextCase } from '@/lib/utils/methods';

import { RestaurantLayoutContext } from '@/lib/context/layout-restaurant.context';

import {
  IUpdateProfileProps,
  IUpdateProfileForm,
  IQueryResult,
} from '@/lib/utils/interfaces';

import {
  ICuisine,
  IGetCuisinesData,
} from '@/lib/utils/interfaces/cuisine.interface';

export default function UpdateRestaurantDetails({
  stepperProps,
}: IUpdateProfileProps) {
  const { onStepChange, order } = stepperProps ?? {
    onStepChange: () => {},
    order: -1,
  };

  const { restaurantLayoutContextData } = useContext(RestaurantLayoutContext);

  const { restaurantId } = restaurantLayoutContextData;

  const { showToast } = useContext(ToastContext);
  const { restaurantProfileResponse, refetchRestaurantProfile } =
    useContext(ProfileContext);

  const [editRestaurant] = useMutation(EDIT_RESTAURANT, {
    onError: ({ graphQLErrors, networkError }) => {
      showToast({
        type: 'error',
        title: 'Edit Restaurant',
        message:
          graphQLErrors[0]?.message ??
          networkError?.message ??
          'Restaurant Edit Failed',
        duration: 2500,
      });
    },
    onCompleted: async () => {
      showToast({
        type: 'success',
        title: 'Restaurant Details Saved',
        message: 'Restaurant has been updated successfully',
        duration: 3000,
      });

      await refetchRestaurantProfile();

      onStepChange(order + 1);
    },
  });

  const cuisineResponse = useQueryGQL(GET_CUISINES, {
    debounceMs: 300,
  }) as IQueryResult<IGetCuisinesData | undefined, undefined>;

  const cuisinesDropdown = useMemo(
    () =>
      cuisineResponse.data?.cuisines?.map((cuisine: ICuisine) => ({
        label: toTextCase(cuisine.name, 'title'),
        code: cuisine.name,
      })),
    [cuisineResponse.data?.cuisines]
  );

  const initialValues: IUpdateProfileForm = useMemo(() => {
    const restaurantData = restaurantProfileResponse.data?.restaurant;
    return {
      name: restaurantData?.name ?? '',
      username: restaurantData?.username ?? '',
      password: restaurantData?.password ?? '',
      confirmPassword: restaurantData?.password ?? '',
      address: restaurantData?.address ?? '',
      deliveryTime: restaurantData?.deliveryTime ?? 0,
      minOrder: restaurantData?.minimumOrder ?? 0,
      salesTax: restaurantData?.tax ?? 0,
      shopType:
        SHOP_TYPE.find((type) => type.code === restaurantData?.shopType) ??
        null,
      cuisines: Array.isArray(restaurantData?.cuisines)
        ? restaurantData.cuisines.map((cuisine) => ({
            label: toTextCase(cuisine, 'title'),
            code: cuisine,
          }))
        : [],
      image: restaurantData?.image ?? '',
      logo: restaurantData?.logo ?? '',
      email: restaurantData?.username ?? '',
      orderprefix: restaurantData?.orderPrefix ?? '',
    };
  }, [restaurantProfileResponse.data?.restaurant]);

  const onEditRestaurant = async (data: IUpdateProfileForm) => {
    if (!restaurantId) {
      showToast({
        type: 'error',
        title: 'Edit Restaurant',
        message: 'Restaurant Edit Failed - Please select a vendor.',
        duration: 2500,
      });
      return;
    }

    try {
      await editRestaurant({
        variables: {
          restaurantInput: {
            _id: restaurantId,
            name: data.name,
            address: data.address,
            image: data.image,
            logo: data.logo,
            deliveryTime: data.deliveryTime,
            minimumOrder: data.minOrder,
            username: data.username,
            password: data.password,
            shopType: data.shopType?.code,
            salesTax: data.salesTax,
            orderPrefix: data.orderprefix,
            cuisines: data.cuisines.map((cuisine) => cuisine.code),
          },
        },
      });
    } catch (error) {
      console.error('Error calling editRestaurant mutation:', error);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-start">
      <div className="h-full w-full">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col mb-2">
            <span className="text-lg">Update Profile</span>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={RestaurantSchema}
            onSubmit={(values) => {
              return onEditRestaurant(values);
            }}
            validateOnChange
            enableReinitialize
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
                          ProfileErrors
                        )
                          ? 'red'
                          : '',
                      }}
                    />

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
                          ProfileErrors
                        )
                          ? 'red'
                          : '',
                      }}
                    />

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
                            ProfileErrors
                          )
                            ? 'red'
                            : '',
                        }}
                      />
                    </div>

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
                          ProfileErrors
                        )
                          ? 'red'
                          : '',
                      }}
                    />

                    <CustomTextField
                      placeholder="Address"
                      name="address"
                      type="text"
                      maxLength={100}
                      showLabel={true}
                      value={values.address}
                      onChange={handleChange}
                      style={{
                        borderColor: onErrorMessageMatcher(
                          'address',
                          errors?.address,
                          ProfileErrors
                        )
                          ? 'red'
                          : '',
                      }}
                    />

                    <CustomNumberField
                      suffix=" m"
                      min={0}
                      max={500}
                      placeholder="Delivery Time"
                      name="deliveryTime"
                      showLabel={true}
                      value={values.deliveryTime}
                      onChange={setFieldValue}
                      style={{
                        borderColor: onErrorMessageMatcher(
                          'deliveryTime',
                          errors?.deliveryTime,
                          ProfileErrors
                        )
                          ? 'red'
                          : '',
                      }}
                    />

                    <CustomNumberField
                      min={1}
                      max={99999}
                      placeholder="Min Order"
                      name="minOrder"
                      showLabel={true}
                      value={values.minOrder}
                      onChange={setFieldValue}
                      style={{
                        borderColor: onErrorMessageMatcher(
                          'minOrder',
                          errors?.minOrder,
                          ProfileErrors
                        )
                          ? 'red'
                          : '',
                      }}
                    />

                    <CustomNumberField
                      suffix=" %"
                      min={0}
                      max={100}
                      placeholder="Sales Tax"
                      minFractionDigits={2}
                      maxFractionDigits={2}
                      name="salesTax"
                      maxLength={20}
                      showLabel={true}
                      value={values.salesTax}
                      onChange={setFieldValue}
                      style={{
                        borderColor: onErrorMessageMatcher(
                          'salesTax',
                          errors?.salesTax,
                          ProfileErrors
                        )
                          ? 'red'
                          : '',
                      }}
                    />

                    <CustomTextField
                      placeholder="Order Prefix"
                      name="orderprefix"
                      type="text"
                      maxLength={100}
                      showLabel={true}
                      value={values.orderprefix}
                      onChange={handleChange}
                      style={{
                        borderColor: onErrorMessageMatcher(
                          'orderprefix',
                          errors?.orderprefix,
                          ProfileErrors
                        )
                          ? 'red'
                          : '',
                      }}
                    />

                    <CustomDropdownComponent
                      name="shopType"
                      placeholder="Shop Category"
                      selectedItem={values.shopType}
                      setSelectedItem={setFieldValue}
                      options={SHOP_TYPE}
                      showLabel={true}
                      style={{
                        borderColor: onErrorMessageMatcher(
                          'shopType',
                          errors?.shopType,
                          ProfileErrors
                        )
                          ? 'red'
                          : '',
                      }}
                    />

                    <CustomMultiSelectComponent
                      name="cuisines"
                      placeholder="Cuisines"
                      options={cuisinesDropdown ?? []}
                      selectedItems={values.cuisines}
                      setSelectedItems={setFieldValue}
                      showLabel={true}
                      style={{
                        borderColor: onErrorMessageMatcher(
                          'cuisines',
                          errors?.cuisines as string,
                          ProfileErrors
                        )
                          ? 'red'
                          : '',
                      }}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-gray-200 p-4 rounded-lg">
                      <CustomUploadImageComponent
                        key="logo"
                        name="logo"
                        title="Upload Logo"
                        onSetImageUrl={setFieldValue}
                        existingImageUrl={values.logo}
                        showExistingImage={true}
                        style={{
                          borderColor: onErrorMessageMatcher(
                            'logo',
                            errors?.logo as string,
                            ProfileErrors
                          )
                            ? 'red'
                            : '',
                        }}
                      />
                      <CustomUploadImageComponent
                        key="image"
                        name="image"
                        title="Upload Image"
                        onSetImageUrl={setFieldValue}
                        showExistingImage={true}
                        existingImageUrl={values.image}
                        style={{
                          borderColor: onErrorMessageMatcher(
                            'image',
                            errors?.image as string,
                            ProfileErrors
                          )
                            ? 'red'
                            : '',
                        }}
                      />
                    </div>

                    <div className="flex justify-end mt-4">
                      <CustomButton
                        className="w-fit h-10 bg-black text-white border-gray-300 px-8"
                        label="Update"
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
  );
}
