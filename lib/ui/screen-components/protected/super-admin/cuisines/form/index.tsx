'use client';
// Contexts
import { CREATE_CUISINE, EDIT_CUISINE, GET_CUISINES } from '@/lib/api/graphql';

// Contexts
import { ToastContext } from '@/lib/context/global/toast.context';

// Components
import CustomDropdownComponent from '@/lib/ui/useable-components/custom-dropdown';
import CustomTextAreaField from '@/lib/ui/useable-components/custom-text-area-field';
import CustomTextField from '@/lib/ui/useable-components/input-field';

// Interfaces
import { IAddCuisineProps } from '@/lib/utils/interfaces/cuisine.interface';

// Schema
import { CuisineFormSchema } from '@/lib/utils/schema';
import { Form, Formik } from 'formik';

// Prime react
import { ProgressSpinner } from 'primereact/progressspinner';
import { Sidebar } from 'primereact/sidebar';

// Hooks
import { ApolloError, useMutation } from '@apollo/client';
import { useContext } from 'react';
import CustomUploadImageComponent from '@/lib/ui/useable-components/upload/upload-image';
import { onErrorMessageMatcher } from '@/lib/utils/methods';
import { CuisineErrors } from '@/lib/utils/constants';

export default function CuisineForm({
  setVisible,
  setIsEditing,
  isEditing,
  visible,
}: IAddCuisineProps) {
  //Toast
  const { showToast } = useContext(ToastContext);

  // Initial values
  const initialValues = {
    _id: isEditing.bool ? isEditing?.data?._id : '',
    name: isEditing.bool ? isEditing?.data?.name : '',
    description: isEditing.bool ? isEditing?.data?.description : '',
    shopType: {
      label: isEditing.bool ? isEditing?.data?.shopType : '',
      code: isEditing.bool ? isEditing?.data?.shopType.toLowerCase() : '',
    },
    image: isEditing.bool ? isEditing.data.image : '',
  };

  // Mutations
  const [CreateCuisine, { loading: createCuisineLoading }] = useMutation(
    CREATE_CUISINE,
    {
      onError,
      onCompleted: () => {
        showToast({
          title: `${!isEditing.bool ? 'New' : 'Edit'} Cuisine`,
          type: 'success',
          message: `Cuisine has been ${!isEditing.bool ? 'created' : 'edited'} successfully`,
          duration: 2000,
        });
      },
      refetchQueries: [{ query: GET_CUISINES }],
    }
  );
  const [editCuisine, { loading: editCuisineLoading }] = useMutation(
    EDIT_CUISINE,
    {
      onError,
      onCompleted: () => {
        showToast({
          title: `${!isEditing.bool ? 'New' : 'Edit'} Cuisine`,
          type: 'success',
          message: `Cuisine has been ${!isEditing.bool ? 'created' : 'edited'} successfully`,
          duration: 2000,
        });
      },
      refetchQueries: [{ query: GET_CUISINES }],
    }
  );

  // Shop type options
  const shopTypeOptions = [
    { label: 'Restaurant', code: 'restaurant' },
    { label: 'Shop', code: 'shop' },
  ];

  // API Handlers
  function onError({ cause, networkError }: ApolloError) {
    showToast({
      type: 'error',
      title: `${isEditing.bool ? 'Edit' : 'New'}Cuisine`,
      message:
        cause?.message ??
        networkError?.message ??
        `Cuisine ${isEditing.bool ? 'Editio' : 'Creation'}  Failed`,
      duration: 2500,
    });
  }

  return (
    <Sidebar
      visible={visible}
      onHide={() => setVisible(false)}
      position="right"
      className="w-full sm:w-[600px]"
    >
      <div className="flex flex-col gap-4">
        <h2 className="mb-3 text-xl font-bold">
          {isEditing.bool ? 'Edit' : 'Add'} Cuisine
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={CuisineFormSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            let formData;
            if (!isEditing.bool) {
              formData = {
                name: values.name,
                description: values.description,
                shopType: values.shopType.label,
                image: values.image,
              };
            } else {
              formData = {
                _id: values._id,
                name: values.name,
                description: values.description,
                shopType: values.shopType.label,
                image: values.image,
              };
            }
            if (!isEditing.bool) {
              await CreateCuisine({
                variables: {
                  cuisineInput: formData,
                },
              });
            } else {
              await editCuisine({
                variables: {
                  cuisineInput: formData,
                },
              });
            }

            setVisible(false);

            setSubmitting(false);
            setIsEditing({
              bool: false,
              data: {
                __typename: '',
                _id: '',
                description: '',
                name: '',
                shopType: '',
                image: '',
              },
            });
          }}
          validateOnChange={true}
        >
          {({
            errors,
            handleSubmit,
            handleChange,
            values,
            isSubmitting,
            setFieldValue,
          }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <CustomTextField
                    showLabel={true}
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                    type="text"
                    placeholder="Name"
                    style={{
                      borderColor: onErrorMessageMatcher(
                        'name',
                        errors?.name,
                        CuisineErrors
                      )
                        ? 'red'
                        : '',
                    }}
                  />

                  <CustomTextAreaField
                    showLabel={true}
                    label="Description"
                    name="description"
                    onChange={handleChange}
                    value={values.description}
                    placeholder="Description"
                    rows={5}
                    style={{
                      borderColor: onErrorMessageMatcher(
                        'description',
                        errors?.description,
                        CuisineErrors
                      )
                        ? 'red'
                        : '',
                    }}
                  />

                  <CustomDropdownComponent
                    name="shopType"
                    options={shopTypeOptions}
                    selectedItem={values.shopType}
                    setSelectedItem={setFieldValue}
                    placeholder="Shop Type"
                    showLabel={true}
                    style={{
                      borderColor: onErrorMessageMatcher(
                        'shopType',
                        errors?.shopType?.code,
                        CuisineErrors
                      )
                        ? 'red'
                        : '',
                    }}
                  />

                  <CustomUploadImageComponent
                    name="image"
                    onSetImageUrl={setFieldValue}
                    title="image"
                    existingImageUrl={
                      isEditing.bool ? isEditing.data.image : ''
                    }
                    showExistingImage={
                      isEditing.bool && isEditing.data.image ? true : false
                    }
                  />

                  <button
                    className="float-end my-2 block rounded-md bg-black px-12 py-2 text-white"
                    disabled={
                      isSubmitting || createCuisineLoading || editCuisineLoading
                    }
                    type="submit"
                  >
                    {isSubmitting ||
                      createCuisineLoading ||
                      editCuisineLoading ? (
                      <ProgressSpinner
                        className="m-0 h-6 w-6 items-center self-center p-0"
                        strokeWidth="5"
                        style={{ fill: 'white', accentColor: 'white' }}
                        color="white"
                      />
                    ) : isEditing.bool ? (
                      'Update'
                    ) : (
                      'Add'
                    )}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Sidebar>
  );
}