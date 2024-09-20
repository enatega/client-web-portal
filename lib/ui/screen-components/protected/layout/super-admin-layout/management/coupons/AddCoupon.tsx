'use client';
//queries
import { CREATE_COUPON, EDIT_COUPON } from '@/lib/api/graphql';

//contexts
import { ToastContext } from '@/lib/context/toast.context';

//components
import CustomTextField from '@/lib/ui/useable-components/input-field';

//interfaces
import {
  IAddCouponProps,
  ICoupon,
} from '@/lib/utils/interfaces/coupons.interface';

//schema
import { CouponFormSchema } from '@/lib/utils/schema/coupon';

//formik
import { ErrorMessage, Form, Formik } from 'formik';

//prime react
import { InputSwitch } from 'primereact/inputswitch';
import { ProgressSpinner } from 'primereact/progressspinner';

//hooks
import CustomNumberField from '@/lib/ui/useable-components/number-input-field';
import { useMutation } from '@apollo/client';
import { useContext } from 'react';

export default function AddCoupon({
  setVisible,
  setCoupons,
  isEditing,
  setIsEditing,
  coupons,
  handleAddCouponLocally,
}: IAddCouponProps) {
  //initial values
  const initialValues = {
    _id: isEditing.bool ? isEditing?.data?._id : '',
    title: isEditing.bool ? isEditing?.data?.title : '',
    discount: isEditing.bool ? isEditing?.data?.discount : 0,
    enabled: isEditing.bool ? isEditing?.data?.enabled : true,
  };

  //mutations
  const [CreateCoupon, { loading: createCouponLoading }] =
    useMutation(CREATE_COUPON);
  const [editCoupon, { loading: editCouponLoading }] = useMutation(EDIT_COUPON);
  //toast
  const { showToast } = useContext(ToastContext);

  return (
    <div className="flex flex-col gap-4">
      <Formik
        initialValues={initialValues}
        validationSchema={CouponFormSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
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
            console.log({ formData });
            let res;
            if (!isEditing.bool) {
              res = await CreateCoupon({
                variables: {
                  couponInput: formData,
                },
              });
            } else {
              res = await editCoupon({
                variables: {
                  couponInput: formData,
                },
              });
            }

            setVisible(false);
            showToast({
              title: 'Success',
              type: 'success',
              message: 'Coupon was added successfully!',
              duration: 2000,
            });
            let newCoupon: ICoupon;
            if (isEditing.bool) {
              newCoupon = res?.data?.editCoupon;
              setIsEditing({
                bool: false,
                data: {
                  __typename: '',
                  _id: '',
                  discount: 0,
                  enabled: false,
                  title: '',
                },
              });
              let filteredCoupons = coupons.filter(
                (coupon) => coupon._id !== isEditing.data._id
              );
              filteredCoupons.push(newCoupon);
              setCoupons([newCoupon, ...filteredCoupons]);
            } else {
              newCoupon = res?.data?.createCoupon;
              handleAddCouponLocally(newCoupon);
            }

            setSubmitting(false);
          } catch (err) {
            setVisible(true);
            showToast({
              title: 'Error',
              type: 'error',
              message: 'Something went wrong',
              duration: 2000,
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
              <div className="flex gap-x-2">
                <h2>Add Coupon</h2>
                <div className="flex gap-x-1 items-center">
                  {values.enabled ? 'Enabled' : 'Disabled'}
                  <InputSwitch
                    checked={values.enabled}
                    onChange={(e) => setFieldValue('enabled', e.value)}
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
                className={
                  errors.title ? 'text-red-600 outline outine-red' : ''
                }
              />
              <ErrorMessage
                name="title"
                component="span"
                className="text-red-600"
              />
              <CustomNumberField
                value={values.discount}
                name="discount"
                showLabel={true}
                placeholder={'Discount'}
                onChange={setFieldValue}
                min={0}
                max={100}
                className={
                  errors.discount ? 'text-red-600 outline outine-red' : ''
                }
              />

              {errors.discount}
              <ErrorMessage
                name="discount"
                component="span"
                className="text-red-600"
              />
              <button
                className="float-end rounded-md w-fit h-10 bg-black text-white border-gray-300 px-8"
                disabled={
                  isSubmitting || editCouponLoading || createCouponLoading
                }
                type="submit"
              >
                {isSubmitting || editCouponLoading || createCouponLoading ? (
                  <ProgressSpinner
                    className="w-6 h-6 items-center self-center m-0 p-0"
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
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
