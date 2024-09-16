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
import CustomNumberTextField from '../custom-input';

// Formik
import { Form, Formik } from 'formik';

// GraphQL
import {
  createTipping,
  editTipping,
  getTipping,
} from '@/lib/api/graphql/mutation';
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import { gql, useMutation } from '@apollo/client';

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
  const initialValues: ITippingsForm = {
    tip1: '',
    tip2: '',
    tip3: '',
  };

  const { refetch, loading, data } = useQueryGQL(
    GET_TIPPING,
    {}
  ) as IQueryResult<ITippingResponse | undefined, undefined>;

  const mutation = data && data.tips._id ? EDIT_TIPPING : CREATE_TIPPING;

  const [mutate, { loading: mutationLoading }] = useMutation(mutation, {
    refetchQueries: [{ query: GET_TIPPING }],
    onCompleted: (res) => {
      //TODO: showToast
      console.log(res);
      refetch();
    },
    onError: (error) => {
      //TODO: showToast
      console.error('Error creating tipping:', error);
    },
  });

  return (
    <div className="py-14 px-8 rounded bg-[#F4F4F5] mt-11">
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={TippingSchema}
          onSubmit={(values: ITippingsForm) => {
            const tipVariations = [
              Number(values.tip1),
              Number(values.tip2),
              Number(values.tip3),
            ];
            if (data) {
              mutate({
                variables: {
                  tippingInput: {
                    _id: data.tips._id,
                    tipVariations,
                    enabled: true,
                  },
                },
              });
            }
          }}
          validateOnChange
        >
          {({ values, errors, touched, handleChange }) => (
            <Form className="grid grid-cols-2 gap-3 items-end sm:grid-cols-4">
              <CustomNumberTextField
                type="number"
                name="tip1"
                placeholder="Tip 1 e.g 10"
                maxLength={35}
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
