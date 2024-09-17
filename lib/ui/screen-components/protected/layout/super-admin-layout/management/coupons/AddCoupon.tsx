'use client';
import { CREATE_COUPON } from '@/lib/api/graphql/mutation/coupons';
import { useMutation } from '@apollo/client';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { InputSwitch } from 'primereact/inputswitch';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  RefObject,
  SetStateAction,
  useState,
} from 'react';

export default function AddCoupon({
  toast,
  setVisible,
  executeLazyQuery,
}: {
  toast: RefObject<Toast>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  executeLazyQuery: () => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    discount: 0,
    enabled: true,
  });

  //handle form change
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //mutation
  const [createCoupon, { loading, error }] = useMutation(CREATE_COUPON);
  //handle subission
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    //validation
    if (!formData.title) {
      toast?.current?.show({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Title is a required field',
      });
    } else if (!formData.discount) {
      toast?.current?.show({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please add a discount',
      });
    }

    try {
      const response = await createCoupon({
        variables: {
          couponInput: formData,
        },
      });
      executeLazyQuery();
      if (response) {
        setVisible(false);
        return toast?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Successfully added the coupon',
        });
      }
    } catch (err) {
      setVisible(true);
      toast?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: error?.message,
      });
      return console.log(err);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <form className="flex flex-col gap-8" onSubmit={handleFormSubmit}>
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
      </form>
    </div>
  );
}
