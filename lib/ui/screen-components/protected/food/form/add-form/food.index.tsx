'use client';

// Core
import { Form, Formik } from 'formik';
import { useContext, useMemo, useState } from 'react';

// Context
import { FoodsContext } from '@/lib/context/foods.context';
import { RestaurantLayoutContext } from '@/lib/context/layout-restaurant.context';

// Hooks
import { useQueryGQL } from '@/lib/hooks/useQueryQL';

// Interface and Types
import {
  ICategory,
  ICategoryByRestaurantResponse,
  IFoodDetailsComponentProps,
  IFoodGridItem,
  IQueryResult,
} from '@/lib/utils/interfaces';
import { IFoodDetailsForm } from '@/lib/utils/interfaces/forms/food.form.interface';

// Constants and Methods
import { FoodErrors } from '@/lib/utils/constants';
import { onErrorMessageMatcher } from '@/lib/utils/methods/error';

// Components
import CategoryAddForm from '../../../category/add-form';
import CustomButton from '@/lib/ui/useable-components/button';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import CustomDropdownComponent from '@/lib/ui/useable-components/custom-dropdown';
import CustomTextAreaField from '@/lib/ui/useable-components/custom-text-area-field';
import CustomUploadImageComponent from '@/lib/ui/useable-components/upload/upload-image';

// API
import { GET_CATEGORY_BY_RESTAURANT_ID } from '@/lib/api/graphql';

// Schema
import { FoodSchema } from '@/lib/utils/schema';

const initialValues: IFoodDetailsForm = {
  _id: null,
  title: '',
  description: '',
  image: '',
  category: null,
};
export default function FoodDetails({
  stepperProps,
}: IFoodDetailsComponentProps) {
  // Props
  const { onStepChange, order } = stepperProps ?? {
    onStepChange: () => { },
    type: '',
    order: -1,
  };

  // Context
  const { onSetFoodContextData, foodContextData } = useContext(FoodsContext);
  const {
    restaurantLayoutContextData: { restaurantId },
  } = useContext(RestaurantLayoutContext);

  // State
  const [isAddCategoryVisible, setIsAddCategoryVisible] = useState(false);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [foodInitialValues] = useState(
    foodContextData?.isEditing || foodContextData?.food?.data?.title
      ? { ...initialValues, ...foodContextData?.food?.data }
      : { ...initialValues }
  );

  // Query
  const { data, loading: categoriesLoading } = useQueryGQL(
    GET_CATEGORY_BY_RESTAURANT_ID,
    { id: restaurantId ?? '' },
    {
      fetchPolicy: 'network-only',
      enabled: !!restaurantId,
    }
  ) as IQueryResult<ICategoryByRestaurantResponse | undefined, undefined>;

  // Memoized Data
  const categoriesDropdown = useMemo(
    () =>
      data?.restaurant?.categories.map((category: ICategory) => {
        return { label: category.title, code: category._id };
      }),
    [data?.restaurant?.categories]
  );

  // Handlers
  const onFoodSubmitHandler = (values: IFoodDetailsForm) => {
    const foodData: IFoodGridItem = {
      _id: foodContextData?.food?.data?._id ?? '',
      title: values.title,
      description: values.description,
      category: values.category,
      image: values.image,
      isActive: false
    };

    onSetFoodContextData({
      food: {
        _id: '',
        data: foodData,
        variations:
          (foodContextData?.food?.variations ?? []).length > 0
            ? (foodContextData?.food?.variations ?? [])
            : [],
      },
    });
    onStepChange(order + 1);
  };

  return (
    <div className="w-full h-full flex items-center justify-start">
      <div className="h-full w-full">
        <div className="flex flex-col gap-2">
          <div>
            <Formik
              initialValues={foodInitialValues}
              validationSchema={FoodSchema}
              enableReinitialize={true}
              onSubmit={async (values) => {
                onFoodSubmitHandler(values);
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
                      <div>
                        <CustomDropdownComponent
                          name="category"
                          placeholder="Select Category"
                          showLabel={true}
                          selectedItem={values.category}
                          setSelectedItem={setFieldValue}
                          options={categoriesDropdown ?? []}
                          isLoading={categoriesLoading}
                          extraFooterButton={{
                            title: 'Add New Category',
                            onChange: () => setIsAddCategoryVisible(true),
                          }}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'category',
                              errors?.category,
                              FoodErrors
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>

                      <div>
                        <CustomTextField
                          type="text"
                          name="title"
                          placeholder="Title"
                          maxLength={35}
                          value={values.title}
                          onChange={handleChange}
                          showLabel={true}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'title',
                              errors?.title,
                              FoodErrors
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>
                      <div>
                        <CustomTextAreaField
                          name="description"
                          label="Description"
                          placeholder="Description"
                          value={values.description}
                          onChange={handleChange}
                          showLabel={true}
                          className={''}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'description',
                              errors.description,
                              FoodErrors
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>

                      <div>
                        <CustomUploadImageComponent
                          key="image"
                          name="image"
                          title="Upload Image"
                          onSetImageUrl={setFieldValue}
                          existingImageUrl={
                            foodContextData?.isEditing ||
                              foodContextData?.food?.data?.image
                              ? (values.image ?? '')
                              : ''
                          }
                          showExistingImage={
                            foodContextData?.isEditing ||
                            !!foodContextData?.food?.data?.image
                          }
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'image',
                              errors?.image,
                              FoodErrors
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <CustomButton
                        className="w-fit h-10 bg-black text-white border-gray-300 px-8"
                        label="Next"
                        type="submit"
                        loading={isSubmitting}
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>

      <CategoryAddForm
        category={category}
        onHide={() => {
          setIsAddCategoryVisible(false);
          setCategory(null);
        }}
        isAddCategoryVisible={isAddCategoryVisible}
      />
    </div>
  );
}
