'use client';

// Core
import { Form, Formik } from 'formik';
import { useContext, useState } from 'react';



// Context
import { ToastContext } from '@/lib/context/toast.context';

// Interface and Types
import { ICategory, ICategoryForm, IFoodDetailsComponentProps } from '@/lib/utils/interfaces';
import { IFoodDetailsForm } from '@/lib/utils/interfaces/forms/food.form.interface';

// Constants and Methods
import { CategoryErrors, FoodErrors } from '@/lib/utils/constants';
import { onErrorMessageMatcher } from '@/lib/utils/methods/error';

// Components
import CustomButton from '@/lib/ui/useable-components/button';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import CustomDropdownComponent from '@/lib/ui/useable-components/custom-dropdown';
import CustomTextAreaField from '@/lib/ui/useable-components/custom-text-area-field';
import CustomUploadImageComponent from '@/lib/ui/useable-components/upload/upload-image';


// Schema
import { CategorySchema, FoodSchema } from '@/lib/utils/schema';
import { FoodsContext } from '@/lib/context/foods.context';
import CustomInputSwitch from '@/lib/ui/useable-components/custom-input-switch';
import { CREATE_CATEGORY, GET_CATEGORY_BY_RESTAURANT_ID } from '@/lib/api/graphql';
import { RestaurantLayoutContext } from '@/lib/context/layout-restaurant.context';
import { useMutation } from '@apollo/client';
import HeaderText from '@/lib/ui/useable-components/header-text';



const initialValues: IFoodDetailsForm = {
  _id: null,
  title: '',
  description: '',
  image: '',
  category: null,
};
export default function FoodDetails({
  stepperProps,
  categoryDropdown,
}: IFoodDetailsComponentProps) {

  // Props
  const { onStepChange, order } = stepperProps ?? {
    onStepChange: () => { },
    type: '',
    order: -1,
  };

  // Statee
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [foodInitialValues, setFoodInitialValues] = useState(initialValues)
  // Context
  const { onSetFoodContextData } = useContext(FoodsContext)
  const { showToast } = useContext(ToastContext)
  const { restaurantLayoutContextData: { restaurantId } } = useContext(RestaurantLayoutContext)

  // Mutation
  const [createCategory, { loading: mutationLoading }] = useMutation(
    CREATE_CATEGORY,
    {
      refetchQueries: [
        {
          query: GET_CATEGORY_BY_RESTAURANT_ID,
          variables: { id: restaurantId },
        },
      ],
      onCompleted: ({ createCategory }: { createCategory: { categories: ICategory[] } }) => {

        const recent_category = createCategory?.categories[createCategory?.categories?.length - 1 ?? 0]

        if (!recent_category?._id) {
          showToast({
            type: 'error',
            title: 'New Category',
            message: "Category creation failed.",
          });
          return;

        }

        setFoodInitialValues({
          ...foodInitialValues,
          category: { label: recent_category?.title ?? "", code: recent_category?._id ?? "" }
        })

        showToast({
          type: 'success',
          title: 'New Category',
          message: `Category has been added successfully.`,
        });

        setShowAddForm(false)

      },
      onError: (error) => {
        let message = '';
        try {
          message = error.graphQLErrors[0]?.message;
        } catch (err) {
          message = 'ActionFailedTryAgain';
        }
        showToast({
          type: 'error',
          title: 'New Category',
          message,
        });
      },
    }
  );


  // Handlers
  const onFoodSubmitHandler = (values: IFoodDetailsForm) => {
    onSetFoodContextData({ food: { _id: null, data: values, variations:[] } })
    onStepChange(order + 1);
  }

  const onHandleCategorySubmit = (values: ICategoryForm) => {
    createCategory({
      variables: {
        category: {
          restaurant: restaurantId,
          _id: '',
          title: values.title,
        },
      },
    });
  };


  return (
    <div className="w-full h-full flex items-center justify-start">
      <div className="h-full w-full">
        <div className="flex flex-col gap-2">


          <div className="flex items-center justify-end flex-shrink-0 mt-3">
            <CustomInputSwitch
              label="Add Category"
              isActive={showAddForm}
              onChange={() => {
                setShowAddForm((prevState) => !prevState);
              }}
            />
          </div>


          {showAddForm && <div className='bg-gray-100 p-3 rounded'>
            <Formik
              initialValues={{ title: "" }}
              validationSchema={CategorySchema}
              onSubmit={onHandleCategorySubmit}
            >
              {({ values, errors, handleChange, handleSubmit }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <HeaderText text='Add Category' className='heading-4'/>
                      <div>
                        <CustomTextField
                          type="text"
                          name="title"
                          placeholder="Category Name"
                          maxLength={35}
                          value={values.title}
                          onChange={handleChange}
                          showLabel={true}
                          style={{
                            borderColor: onErrorMessageMatcher(
                              'title',
                              errors?.title,
                              CategoryErrors
                            )
                              ? 'red'
                              : '',
                          }}
                        />
                      </div>

                      <div className="mt-4 flex justify-end">
                        <CustomButton
                          className="h-10 w-fit border-gray-300 bg-black px-8 text-white"
                          label='Add'
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
          }

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




                      {!showAddForm && <div>
                        <CustomDropdownComponent
                          name="category"
                          placeholder="Select Category"
                          showLabel={true}
                          selectedItem={values.category}
                          setSelectedItem={setFieldValue}
                          options={categoryDropdown ?? []}
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
                      }

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
                          name='description'
                          label='Description'
                          placeholder="Description"
                          value={values.description}
                          onChange={handleChange}
                          showLabel={true}
                          className={''}
                          style={{
                            borderColor:
                              onErrorMessageMatcher(
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
    </div>
  );
}
