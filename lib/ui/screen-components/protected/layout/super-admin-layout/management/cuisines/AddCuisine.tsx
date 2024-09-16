'use client';
import { CREATE_CUISINE } from '@/lib/api/graphql/mutation/cuisines';
import { useMutation } from '@apollo/client';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  RefObject,
  SetStateAction,
  useState,
} from 'react';

export default function AddCuisine({
  setVisible,
  toast,
}: {
  setVisible: Dispatch<SetStateAction<boolean>>;
  toast: RefObject<Toast>;
}) {
  //form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shopType: '',
  });

  // handle form change
  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  // create mutation
  const [CreateCuisine, { loading, error }] = useMutation(CREATE_CUISINE);

  //handle form submit
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (!formData.name) {
        return toast.current?.show({
          severity: 'warn',
          summary: 'Warning',
          detail: 'Name Field cannot be empty',
          life: 2000,
        });
      } else if (!formData.description) {
        return toast.current?.show({
          severity: 'warn',
          summary: 'Warning',
          detail: 'Description cannot be empty',
          life: 2000,
        });
      } else if (!formData.shopType) {
        return toast.current?.show({
          severity: 'warn',
          summary: 'Warning',
          detail: 'Shop Type cannot be empty',
          life: 2000,
        });
      }
      const response = await CreateCuisine({
        variables: { cuisineInput: formData },
      });
      if (response) {
        setVisible(false);
        toast?.current?.show({
          severity: 'success',
          summary: 'Sucess',
          detail: 'Cuisine was added successfully!',
          life: 2000,
        });
      }
    } catch (err) {
      setVisible(true);
      toast?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: error?.message,
        life: 2000,
      });
      return console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold mb-3 text-xl">Add Cuisine</h2>
      <form className="flex flex-col gap-8" onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="name">
            Cuisine Name
          </label>
          <InputText
            value={formData.name}
            onChange={handleFormChange}
            name="name"
            id="name"
            className="w-full py-2 px-1 text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="description">
            Description
          </label>
          <InputTextarea
            value={formData.description}
            onChange={handleFormChange}
            name="description"
            id="description"
            className="w-full text-sm"
            rows={5}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="shoptType">
            Shop Type
          </label>
          <select
            name="shopType"
            id="shopType"
            onChange={handleFormChange}
            value={formData.shopType}
            className="w-full outline-none py-2 px-1 text-sm"
          >
            <option value="">Select</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Hotel">Hotel</option>
            <option value="Bakery">Bakery</option>
          </select>
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
