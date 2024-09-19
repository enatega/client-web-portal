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

// GraphQL
import { createTipping, editTipping, getTipping } from '@/lib/api/graphql';
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import { gql, useMutation } from '@apollo/client';

//Toast
import useToast from '@/lib/hooks/useToast';

const CREATE_TIPPING = gql`
  ${createTipping}
`;

const GET_TIPPING = gql`
  ${getTipping}
`;

const EDIT_TIPPING = gql`
  ${editTipping}
`;

const TippingAddForm = () => {
  // State
  const initialValues: ITippingsForm = {
    tip1: '',
    tip2: '',
    tip3: '',
  };

  // Hooks
  const { showToast } = useToast();

  // Query
  const { refetch, loading, data } = useQueryGQL(GET_TIPPING, {
    fetchPolicy: 'cache-and-network',
  }) as IQueryResult<ITippingResponse | undefined, undefined>;

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
          refetch();
        },
        onError: (error) => {
          let message = '';
          try {
            message = error.graphQLErrors[0].message;
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
    <div className="py-14 px-8 rounded bg-[#F4F4F5] mt-11">
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={TippingSchema}
          onSubmit={handleSubmit}
          validateOnChange
        >
          {({ values, errors, touched, handleChange }) => (
            <Form className="grid grid-cols-2 gap-3 items-end sm:grid-cols-4">
              <CustomNumberTextField
                type="number"
                name="tip1"
                placeholder="Tip 1 e.g 10"
                maxLength={35}
                min={0}
                max={100}
                value={values.tip1}
                onChange={handleChange}
                showLabel={true}
                style={{
                  borderColor: errors?.tip1 && touched.tip1 ? 'red' : '',
                }}
              />
              <CustomNumberTextField
                type="number"
                name="tip2"
                placeholder="Tip 2 e.g 20"
                maxLength={35}
                min={0}
                max={100}
                showLabel={true}
                value={values.tip2}
                onChange={handleChange}
                style={{
                  borderColor: errors.tip2 && touched.tip2 ? 'red' : '',
                }}
              />
              <CustomNumberTextField
                type="number"
                name="tip3"
                placeholder="Tip 3 e.g 30"
                maxLength={35}
                min={0}
                max={100}
                showLabel={true}
                value={values.tip3}
                onChange={handleChange}
                style={{
                  borderColor: errors.tip3 && touched.tip3 ? 'red' : '',
                }}
              />
              <CustomButton
                className="h-11 flex px-10 text-white border-gray-300 bg-[black] rounded-md"
                label={'Add'}
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
