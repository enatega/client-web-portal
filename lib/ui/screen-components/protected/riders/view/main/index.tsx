import CustomTextField from '@/lib/ui/useable-components/input-field';
import Table from '@/lib/ui/useable-components/table';
import TextComponent from '@/lib/ui/useable-components/text-field';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import {
  IRidersMainComponentsProps,
  IRiderToggleComponentProps,
} from '@/lib/utils/interfaces/rider.interface';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FilterMatchMode } from 'primereact/api';
import { useState } from 'react';

const Toggle = (product: IRiderToggleComponentProps) => {
  return (
    <label className="ml-2 flex items-center cursor-pointer flex-shrink-0">
      <div className="relative">
        <div className="flex items-center space-x-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={product.available}
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
  { headerName: 'ID', propertyName: 'id' },
  { headerName: 'Name', propertyName: 'name' },
  { headerName: 'Email', propertyName: 'email' },
  { headerName: 'Password', propertyName: 'password' },
  { headerName: 'Phone', propertyName: 'phone' },
  { headerName: 'Zone', propertyName: 'zone' },
  { headerName: 'Available', propertyName: 'available', body: Toggle },
];

export default function RidersMain({
  setIsAddRiderVisible,
}: IRidersMainComponentsProps) {
  const [selectedProducts, setSelectedProducts] = useState<
    IRiderToggleComponentProps[]
  >([]);
  const [data] = useState<IRiderToggleComponentProps[]>([
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

  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: '' as string | null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      value: '' as string | null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
  });

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const header = (
    <div className="flex flex-col mx-[-15px] mb-4 gap-6">
      <div className="flex w-full justify-between">
        <TextComponent className="text-4xl font-bold" text="Rider" />
        <TextIconClickable
          className="sm:w-auto bg-black text-white border-gray-300 rounded"
          icon={faAdd}
          iconStyles={{ color: 'white' }}
          title="Add Rider"
          onClick={() => setIsAddRiderVisible(true)}
        />
      </div>
      <div className="w-fit flex flex-colm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <CustomTextField
          type="text"
          name="vendorFilter"
          maxLength={35}
          showLabel={false}
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
        />
      </div>
    </div>
  );

  return (
    <div className="p-2 pt-5">
      <Table
        header={header}
        data={data}
        filters={filters}
        setSelectedData={setSelectedProducts}
        selectedData={selectedProducts}
        columns={COLUMNS}
      />
    </div>
  );
}
