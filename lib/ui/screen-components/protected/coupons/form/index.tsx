'use client';
// GraphQL
import { CREATE_COUPON, EDIT_COUPON, GET_COUPONS } from '@/lib/api/graphql';

// Contexts
import { ToastContext } from '@/lib/context/toast.context';

// Components
import CustomTextField from '@/lib/ui/useable-components/input-field';
import CustomNumberField from '@/lib/ui/useable-components/number-input-field';

// Interfaces
import { IAddCouponProps } from '@/lib/utils/interfaces/coupons.interface';

// Schema
import { CouponFormSchema } from '@/lib/utils/schema/coupon';

// Formik
import { Form, Formik } from 'formik';

// Prime react
import { ProgressSpinner } from 'primereact/progressspinner';
import { Sidebar } from 'primereact/sidebar';

// Hooks
import { useMutation } from '@apollo/client';
import { ChangeEvent, useContext } from 'react';
import CustomInputSwitch from '@/lib/ui/useable-components/custom-input-switch';
import { onErrorMessageMatcher } from '@/lib/utils/methods';
import { CouponErrors } from '@/lib/utils/constants';

export default function CouponForm({
  setVisible,
  isEditing,
  visible,
  setIsEditing,
}: IAddCouponProps) {
  // Toast
  const { showToast } = useContext(ToastContext);

  // Initial values
  const initialValues = {
    _id: isEditing.bool ? isEditing?.data?._id : '',
    title: isEditing.bool ? isEditing?.data?.title : '',
    discount: isEditing.bool ? isEditing?.data?.discount : 0,
    enabled: isEditing.bool ? isEditing?.data?.enabled : true,
  };

  // Mutations
  const [CreateCoupon, { loading: createCouponLoading }] = useMutation(
    CREATE_COUPON,
    {
      refetchQueries: [{ query: GET_COUPONS }],
      onCompleted: () => {
        showToast({
          title: `${isEditing.bool ? 'Edit' : 'New'} Coupon`,
          type: 'success',
          message: 'Coupon has been added successfully',
          duration: 2000,
        });
      },
      onError: (err) => {
        showToast({
          title: `${isEditing.bool ? 'Edit' : 'New'} Coupon`,
          type: 'error',
          message:
            err.message ||
            `Coupon ${isEditing.bool ? 'Edition' : 'Creation'} Failed`,
          duration: 2000,
        });
      },
    }
  );
  const [editCoupon, { loading: editCouponLoading }] = useMutation(
    EDIT_COUPON,
    {
      refetchQueries: [{ query: GET_COUPONS }],
      onCompleted: () => {
        showToast({
          title: `${isEditing.bool ? 'Edit' : 'New'} Coupon`,
          type: 'success',
          message: `Coupon has been ${isEditing.bool ? 'edited' : 'added'}  successfully`,
          duration: 2000,
        });
      },
      onError: (err) => {
        showToast({
          title: `${isEditing.bool ? 'Edit' : 'New'} Coupon`,
          type: 'error',
          message:
            err.message ||
            `Coupon ${isEditing.bool ? 'Edition' : 'Creation'} Failed`,
          duration: 2000,
        });
      },
    }
  );

  return (
    <Sidebar
      visible={visible}
      onHide={() => setVisible(false)}
      position="right"
      className="w-full sm:w-[450px]"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={CouponFormSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          let formData;
          if (!isEditing.bool) {
            formData = {
              title: values.title,
              discount: values.discount,
              enabled: values.enabled,
            };
          } else {
            formData = {
              _id: values._id,
              title: values.title,
              discount: values.discount,
              enabled: values.enabled,
            };
          }

          if (!isEditing.bool) {
            await CreateCoupon({
              variables: {
                couponInput: formData,
              },
            });
          } else {
            await editCoupon({
              variables: {
                couponInput: formData,
              },
            });
          }
          setIsEditing({
            bool: false,
            data: {
              __typename: '',
              _id: '',
              discount: 0,
              enabled: true,
              title: '',
            },
          });
          setVisible(false);

          setSubmitting(false);
        }}
        validateOnChange={true}
      >
        {({ errors, handleSubmit, values, isSubmitting, setFieldValue }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <h2>{isEditing.bool ? 'Edit' : 'Add'} Coupon</h2>
                  <div className="flex items-center gap-x-1">
                    {values.enabled ? 'Enabled' : 'Disabled'}
                    <CustomInputSwitch
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFieldValue('enabld', e.target.checked)
                      }
                      isActive={values.enabled}
                      className={values.enabled ? 'p-inputswitch-checked' : ''}
                    />
                  </div>
                </div>
                <CustomTextField
                  value={values.title}
                  name="title"
                  showLabel={true}
                  placeholder={'Title'}
                  type="text"
                  onChange={(e) => setFieldValue('title', e.target.value)}
                  style={{
                    borderColor: onErrorMessageMatcher(
                      'title',
                      errors?.title,
                      CouponErrors
                    )
                      ? 'red'
                      : '',
                  }}
                />

                <CustomNumberField
                  value={values.discount}
                  name="discount"
                  showLabel={true}
                  placeholder={'Discount'}
                  onChange={setFieldValue}
                  min={0}
                  max={100}
                  style={{
                    borderColor: onErrorMessageMatcher(
                      'discount',
                      errors?.discount,
                      CouponErrors
                    )
                      ? 'red'
                      : '',
                  }}
                />

                <button
                  className="float-end h-10 w-fit rounded-md border-gray-300 bg-black px-8 text-white"
                  disabled={
                    isSubmitting || editCouponLoading || createCouponLoading
                  }
                  type="submit"
                >
                  {isSubmitting || editCouponLoading || createCouponLoading ? (
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
    </Sidebar>
  );
}
