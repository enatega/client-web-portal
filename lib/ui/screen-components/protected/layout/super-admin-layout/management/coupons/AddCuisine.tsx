'use client';
import { createCuisine } from '@/lib/api/graphql/mutants';
import { gql, useMutation } from '@apollo/client';
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
import { CgSpinner } from 'react-icons/cg';

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
  //queries
  const CREATE_CUISINE_QUERY = gql`
    ${createCuisine}
  `;
  // create mutation
  const [CreateCuisine, { data, loading, error }] =
    useMutation(CREATE_CUISINE_QUERY);
  console.log({ CreateCuisine, data, loading, error });
  //handle create form submit
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await CreateCuisine({
      variables: { cuisineInput: formData },
    });
    if (response && response.errors) {
      alert('An error occured please try again');
      toast?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: error?.message || response.errors[0]?.message,
        life: 2000,
      });
    } else if (!loading && !error && !response?.errors?.length) {
      setVisible(false);
      toast?.current?.show({
        severity: 'success',
        summary: 'Sucess',
        detail: 'Cuisine was added successfully!',
        life: 2000,
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold mb-12 text-xl">Add Cuisine</h2>
      <form
        action=""
        className="flex flex-col gap-12"
        onSubmit={handleFormSubmit}
      >
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
            <CgSpinner
              color="white"
              size={25}
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
