'use client';

// Interface and Types
import {
  IQueryResult,
  ITippingResponse,
  ITippingsForm,
} from '@/lib/utils/interfaces';

// Schema
import { TippingSchema } from '@/lib/utils/schema/tipping';

// Components
import CustomButton from '@/lib/ui/useable-components/button';
import CustomNumberTextField from '@/lib/ui/useable-components/custom-input';

// Formik
import { Form, Formik, FormikHelpers } from 'formik';

//Toast
import useToast from '@/lib/hooks/useToast';

// GraphQL
import { CREATE_TIPPING, EDIT_TIPPING, GET_TIPPING } from '@/lib/api/graphql';
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import { useMutation } from '@apollo/client';

const TippingAddForm = () => {
  // Query
  const { loading, data } = useQueryGQL(GET_TIPPING, {
    fetchPolicy: 'cache-and-network',
  }) as IQueryResult<ITippingResponse | undefined, undefined>;

  // State
  const initialValues: ITippingsForm = {
    tip1: data?.tips?.tipVariations[0] ?? 1,
    tip2: data?.tips?.tipVariations[1] ?? 2,
    tip3: data?.tips?.tipVariations[2] ?? 3,
  };

  // Hooks
  const { showToast } = useToast();

  // Mutation
  const mutation = data && data.tips._id ? EDIT_TIPPING : CREATE_TIPPING;
  const [mutate, { loading: mutationLoading }] = useMutation(mutation);

  //Form Submission
  const handleSubmit = (
    values: ITippingsForm,
    { resetForm }: FormikHelpers<ITippingsForm>
  ) => {
    if (data) {
      mutate({
        variables: {
          tippingInput: {
            _id: data.tips._id,
            tipVariations: [values.tip1, values.tip2, values.tip3],
            enabled: true,
          },
        },
        onCompleted: () => {
          showToast({
            type: 'success',
            title: 'Success!',
            message: 'Tipping updated',
            duration: 3000,
          });
          resetForm();
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
            title: 'Error!',
            message,
            duration: 3000,
          });
        },
      });
    }
  };

  return (
    <div className="mt-7 rounded bg-[#F4F4F5] px-8 py-14">
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={TippingSchema}
          onSubmit={handleSubmit}
          validateOnChange
          validateOnBlur
          enableReinitialize
        >
          {({ values, errors, touched, setFieldValue, validateForm }) => (
            <Form className="grid grid-cols-2 items-center gap-3 sm:grid-cols-4">
              <CustomNumberTextField
                name="tip1"
                placeholder="Tip 1 e.g 10"
                maxLength={35}
                min={1}
                max={100}
                value={values.tip1}
                onChange={setFieldValue}
                isLoading={loading}
                showLabel={true}
                style={{
                  borderColor: errors?.tip1 && touched.tip1 ? 'red' : '',
                }}
              />
              <CustomNumberTextField
                name="tip2"
                placeholder="Tip 2 e.g 20"
                maxLength={35}
                min={1}
                max={100}
                isLoading={loading}
                showLabel={true}
                value={values.tip2}
                onChange={setFieldValue}
                style={{
                  borderColor: errors.tip2 && touched.tip2 ? 'red' : '',
                }}
              />
              <CustomNumberTextField
                name="tip3"
                min={1}
                max={100}
                placeholder="Tip 3 e.g 30"
                isLoading={loading}
                showLabel={true}
                value={values.tip3}
                onChange={setFieldValue}
                style={{
                  borderColor: errors.tip3 && touched.tip3 ? 'red' : '',
                }}
              />
              <CustomButton
                className="mb-[2px] mt-auto flex h-11 rounded-md border-gray-300 bg-[black] px-10 text-white"
                label={data?.tips._id ? 'Update' : 'Add'}
                rounded={false}
                type="submit"
                loading={mutationLoading}
                disabled={mutationLoading || loading}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TippingAddForm;
