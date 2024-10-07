// Core
import { Form, Formik } from 'formik';

// Prime React
import { Sidebar } from 'primereact/sidebar';

// Interface and Types
import { ICategoryForm } from '@/lib/utils/interfaces/forms';

// Components
import CustomButton from '@/lib/ui/useable-components/button';
import CustomTextField from '@/lib/ui/useable-components/input-field';

// Utilities and Constants
import { CategoryErrors } from '@/lib/utils/constants';
import { onErrorMessageMatcher } from '@/lib/utils/methods/error';

//Toast
import useToast from '@/lib/hooks/useToast';

//GraphQL
import {
  CREATE_CATEGORY,
  EDIT_CATEGORY,
  GET_CATEGORY_BY_RESTAURANT_ID,
} from '@/lib/api/graphql';
import { RestaurantLayoutContext } from '@/lib/context/restaurant/layout-restaurant.context';
import { ICategoryAddFormComponentProps } from '@/lib/utils/interfaces';
import { CategorySchema } from '@/lib/utils/schema';
import { useMutation } from '@apollo/client';
import { useContext } from 'react';

export default function CategoryAddForm({
  onHide,
  category,
  position = 'right',
  isAddCategoryVisible,
}: ICategoryAddFormComponentProps) {
  // State
  const initialValues: ICategoryForm = {
    _id: '',
    title: '',
    ...category,
  };

  // Hooks
  const { showToast } = useToast();
  // Context
  const { restaurantLayoutContextData } = useContext(RestaurantLayoutContext);
  const restaurantId = restaurantLayoutContextData?.restaurantId || '';

  // Mutation
  const [createCategory, { loading: mutationLoading }] = useMutation(
    category ? EDIT_CATEGORY : CREATE_CATEGORY,
    {
      refetchQueries: [
        {
          query: GET_CATEGORY_BY_RESTAURANT_ID,
          variables: { id: restaurantId },
        },
      ],
      onCompleted: () => {
        showToast({
          type: 'success',
          title: 'New Category',
          message: `Category has been ${category ? 'edited' : 'added'} successfully.`,
          duration: 3000,
        });
        //  resetForm(); Find a different way
        onHide();
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
          duration: 3000,
        });
      },
    }
  );

  // Form Submission
  const handleSubmit = (values: ICategoryForm) => {
    createCategory({
      variables: {
        category: {
          restaurant: restaurantId,
          _id: category ? category?._id : '',
          title: values.title,
        },
      },
    });
  };

  return (
    <Sidebar
      visible={isAddCategoryVisible}
      position={position}
      onHide={onHide}
      className="w-full sm:w-[600px]"
    >
      <div className="flex h-full w-full items-center justify-start">
        <div className="h-full w-full">
          <div className="flex flex-col gap-2">
            <div className="mb-2 flex flex-col">
              <span className="text-lg">
                {category ? 'Edit' : 'Add'} Category
              </span>
            </div>

            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={CategorySchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ values, errors, handleChange, handleSubmit }) => {
                  return (
                    <Form onSubmit={handleSubmit}>
                      <div className="space-y-4">
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
                            label={category ? 'Edit' : 'Add'}
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
      </div>
    </Sidebar>
  );
}
