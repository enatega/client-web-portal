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
import { ICategoryAddFormComponentProps } from '@/lib/utils/interfaces';
import { CategorySchema } from '@/lib/utils/schema';
import { useMutation } from '@apollo/client';

export default function CategoryAddForm({
  onHide,
  category,
  position = 'right',
  isAddCategoryVisible,
}: ICategoryAddFormComponentProps) {
  // State
  const initialValues: ICategoryForm = {
    restaurantId: '',
    _id: '',
    title: '',
    ...category,
  };

  // Hooks
  const { showToast } = useToast();

  // Mutation
  const [createCategory, { loading: mutationLoading }] = useMutation(
    category ? EDIT_CATEGORY : CREATE_CATEGORY,
    {
      refetchQueries: [{ query: GET_CATEGORY_BY_RESTAURANT_ID }],
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
          restaurant: '',
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
      className="w-full sm:w-[450px]"
    >
      <div className="w-full h-full flex items-center justify-start">
        <div className="h-full w-full">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col mb-2">
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

                        <div className="flex justify-end mt-4">
                          <CustomButton
                            className="w-fit h-10 bg-black text-white border-gray-300 px-8"
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
