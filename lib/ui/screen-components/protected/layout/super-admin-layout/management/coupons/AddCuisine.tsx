import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ChangeEvent, useState } from 'react';

export default function AddCuisine() {
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

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold mb-12 text-xl">Add Cuisine</h2>
      <form action="" className="flex flex-col gap-12">
        <FloatLabel>
          <InputText
            value={formData.name}
            onChange={handleFormChange}
            name="name"
            id="name"
            className="w-full py-2 px-1 text-sm"
          />
          <label className="font-bold" htmlFor="name">
            Cuisine Name
          </label>
        </FloatLabel>
        <FloatLabel>
          <InputTextarea
            value={formData.description}
            onChange={handleFormChange}
            name="description"
            id="description"
            className="w-full text-sm"
            rows={5}
          />
          <label className="font-bold" htmlFor="description">
            Description
          </label>
        </FloatLabel>
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
        <Button className="bg-black text-white p-2 w-32 right-0 self-end flex items-center justify-center hover:bg-[#000000d8]">
          Add
        </Button>
      </form>
    </div>
  );
}
