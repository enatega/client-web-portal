'use client';
import { CREATE_CUISINE } from '@/lib/api/graphql/mutation/cuisines';
import { ToastContext } from '@/lib/context/toast.context';
import CustomDropdownComponent from '@/lib/ui/useable-components/custom-dropdown';
import CustomTextAreaField from '@/lib/ui/useable-components/custom-text-area-field';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import {
  IAddCuisineProps,
  ICuisine,
} from '@/lib/utils/interfaces/cuisine.interface';
import { CuisineFormSchema } from '@/lib/utils/schema';
import { useMutation } from '@apollo/client';
import { ErrorMessage, Form, Formik } from 'formik';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useContext } from 'react';

export default function AddCuisine({
  setVisible,
  setCuisinesData,
}: IAddCuisineProps) {
  // initial values
  const initialValues = {
    name: '',
    description: '',
    shopType: {
      label: '',
      code: '',
    },
  };
  const { showToast } = useContext(ToastContext);
  //mutation
  const [CreateCuisine, { loading, error }] = useMutation(CREATE_CUISINE);
  // shop type options
  const shopTypeOptions = [
    { label: 'Restaurant', code: 'restaurant' },
    { label: 'Shop', code: 'shop' },
  ];
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold mb-3 text-xl">Add Cuisine</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={CuisineFormSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            const formData = {
              name: values.name,
              description: values.description,
              shopType: values.shopType.label,
            };
            const res = await CreateCuisine({
              variables: { cuisineInput: formData },
            });
            setVisible(false);
            showToast({
              type: 'success',
              message: 'Cuisine was added successfully!',
              life: 2000,
            });
            const newCuisine: ICuisine = res.data.createCuisine;
            setCuisinesData(newCuisine);

            setSubmitting(false);
          } catch (err) {
            setVisible(true);
            showToast({
              type: 'error',
              message:
                error?.message ||
                error?.networkError?.message ||
                error?.clientErrors[0].message ||
                error?.graphQLErrors[0].message ||
                'An error occured',
              life: 2000,
            });
            setSubmitting(false);
            return console.log(err);
          }
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
              <CustomTextField
                showLabel={true}
                name="name"
                onChange={handleChange}
                value={values.name}
                type="text"
                placeholder="Name"
                className={`${errors.name ? 'text-red-600 outline outline-red-600' : ''}`}
              />
              <ErrorMessage
                name="name"
                component="span"
                className="text-red-600"
              />
              <CustomTextAreaField
                showLabel={true}
                label="Description"
                name="description"
                onChange={handleChange}
                value={values.description}
                placeholder="Description"
                rows={5}
                className={`${errors.description ? 'text-red-600 outline outline-red-600' : ''}`}
              />
              <ErrorMessage
                name="description"
                component="span"
                className="text-red-600"
              />
              <CustomDropdownComponent
                name="shopType"
                options={shopTypeOptions}
                selectedItem={values.shopType}
                setSelectedItem={setFieldValue}
                placeholder="Shop Type"
                showLabel={true}
              />
              <span
                className={
                  errors.shopType?.label ? 'text-red-600 visible' : 'hidden'
                }
              >
                {errors.shopType?.label}
              </span>

              <button
                className="block float-end bg-black rounded-md px-5 py-2 my-2 text-white"
                disabled={isSubmitting || loading}
                type="submit"
              >
                {isSubmitting || loading ? (
                  <ProgressSpinner className="w-5 h-5" />
                ) : (
                  'Add'
                )}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
