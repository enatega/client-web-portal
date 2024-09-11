import Table from '@/lib/ui/useable-components/table';
import {
  IRidersMainComponentsProps,
  Rider,
} from '@/lib/utils/interfaces/rider.interface';
import { useState } from 'react';

const Toggle = (product: Rider) => {
  return (
    <label className="ml-2 flex items-center cursor-pointer flex-shrink-0">
      <div className="relative">
        <div className="flex items-center space-x-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={product.available}
              // onChange={handleCheckboxChange}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-primary-color"></div>
            <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-5"></div>
          </label>
        </div>
      </div>
    </label>
  );
};

const COLUMNS = [
  {
    headerName: 'ID',
    propertyName: 'id',
  },
  {
    headerName: 'Name',
    propertyName: 'name',
  },
  {
    headerName: 'Email',
    propertyName: 'email',
  },
  {
    headerName: 'Password',
    propertyName: 'password',
  },
  {
    headerName: 'Phone',
    propertyName: 'phone',
  },
  {
    headerName: 'Zone',
    propertyName: 'zone',
  },
  {
    headerName: 'Available',
    propertyName: 'available',
    body: Toggle,
  },
  {
    headerName: '',
    propertyName: 'available',
  },
];

export default function RidersMain({}: IRidersMainComponentsProps) {
  const [selectedProducts, setSelectedProducts] = useState<Rider[]>([]);
  let [data, setData] = useState<Rider[]>([
    {
      id: 1,
      name: 'Hamza',
      email: 'dummy@gmail.com',
      password: 'dummy',
      phone: '+92333333333',
      zone: 'Asia',
      available: false,
    },
    {
      id: 2,
      name: 'Ahmed',
      email: 'anotherdummy@gmail.com',
      password: 'anotherdummy',
      phone: '+92334444555',
      zone: 'Asia',
      available: true,
    },
  ]);

  return (
    <div className="p-2 pt-5">
      <Table
        data={data}
        setSelectedData={setSelectedProducts}
        selectedData={selectedProducts}
        columns={COLUMNS}
      />
    </div>
  );
}
