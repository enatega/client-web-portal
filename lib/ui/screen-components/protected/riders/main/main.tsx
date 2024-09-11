import Table from '@/lib/ui/useable-components/table';
import { IRidersMainComponentsProps } from '@/lib/utils/interfaces/rider.interface';
import { useState } from 'react';

type Product = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  zone: string;
  available: boolean;
};
type ColumnConfig<T> = {
  propertyName: keyof T;
  headerName: string;
  body?: (rowData: T) => React.ReactNode; // Update
};

export default function RidersMain({}: IRidersMainComponentsProps) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [data, setData] = useState<Product[]>([
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

  const toggleComponent = (product: any) => {
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

  const columns: ColumnConfig<Product>[] = [
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
      body: toggleComponent,
    },
    {
      headerName: '',
      propertyName: 'available',
    },
  ];

  return (
    <div className="p-2 pt-5">
      <Table<Product>
        data={data}
        setSelectedData={setSelectedProducts}
        selectedData={selectedProducts}
        columns={columns}
      />
    </div>
  );
}
