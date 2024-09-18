'use client';
import { CREATE_COUPON } from '@/lib/api/graphql/mutation/coupons';
import { ToastContext } from '@/lib/context/toast.context';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import CustomNumberField from '@/lib/ui/useable-components/number-input-field';
import {
  IAddCouponProps,
  ICoupon,
} from '@/lib/utils/interfaces/coupons.interface';
import { CouponFormSchema } from '@/lib/utils/schema/coupon';
import { useMutation } from '@apollo/client';
import { ErrorMessage, Form, Formik } from 'formik';
import { InputSwitch } from 'primereact/inputswitch';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useContext } from 'react';

export default function AddCoupon({ setVisible, setCoupons }: IAddCouponProps) {
  //initial values
  const initialValues = {
    title: '',
    discount: 0,
    enabled: true,
  };

  //mutation
  const [CreateCoupon, { loading, error }] = useMutation(CREATE_COUPON);
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
            const formData = {
              title: values.title,
              discount: values.discount,
              enabled: values.enabled,
            };
            const res = await CreateCoupon({
              variables: {
                couponInput: formData,
              },
            });
            setVisible(false);
            showToast({
              type: 'success',
              title: 'New Coupon',
              message: 'Coupon was added successfully!',
              duration: 2000,
            });
            const newCoupon: ICoupon = res.data.createCoupon;
            setCoupons(newCoupon);

            setSubmitting(false);
          } catch (err) {
            setVisible(true);
            showToast({
              type: 'error',
              title: 'New Coupon',
              message:
                error?.message ||
                error?.networkError?.message ||
                error?.clientErrors[0].message ||
                error?.graphQLErrors[0].message ||
                'An error occured',
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
                  />
                </div>
              </div>
              <CustomTextField
                value={values.title}
                name="title"
                showLabel={true}
                placeholder={'Title'}
                type="text"
                onChange={handleChange}
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
                onChange={handleChange}
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
                className="block float-end bg-black rounded-md px-12 py-4 my-2 text-white items-center justify-center"
                disabled={isSubmitting || loading}
                type="submit"
              >
                {isSubmitting || loading ? (
                  <ProgressSpinner
                    className="w-6 h-6 items-center self-center m-0 p-0"
                    strokeWidth="5"
                    style={{ fill: 'white', accentColor: 'white' }}
                    color="white"
                  />
                ) : (
                  'Add'
                )}
              </button>
            </Form>
          );
        }}
      </Formik>
      {/* <form className="flex flex-col gap-8" onSubmit={handleFormSubmit}>
        <div className="flex gap-2">
          <h2 className="font-bold mb-3 text-xl">Add Coupon</h2>
          {formData.enabled ? 'Enabled' : 'Disabled'}
          <InputSwitch
            checked={formData.enabled}
            onChange={() =>
              setFormData((prev) => ({ ...prev, enabled: !prev.enabled }))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="name">
            Title
          </label>
          <InputText
            value={formData.title}
            onChange={handleFormChange}
            name="title"
            id="title"
            className="w-full py-2 px-1 text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="discount">
            Discount
          </label>
          <InputNumber
            value={formData.discount}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, discount: e.value ?? 0 }))
            }
            name="discount"
            id="discount"
            className="w-full text-sm"
          />
        </div>
        <Button
          type="submit"
          className="bg-black text-white p-2 w-32 right-0 self-end flex items-center justify-center hover:bg-[#000000d8]"
        >
          {loading ? (
            <FontAwesomeIcon
              color="white"
              icon={faSpinner}
              className="animate-spin self-center items-center"
            />
          ) : (
            'Add'
          )}
        </Button>
      </form> */}
    </div>
  );
}
