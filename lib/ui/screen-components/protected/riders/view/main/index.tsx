// Core
import { useState } from 'react';

// Prime React
import { FilterMatchMode } from 'primereact/api';

// Interface and Types
import {
  IRiderDataComponentProps,
  IRidersMainComponentsProps,
} from '@/lib/utils/interfaces/rider.interface';

// Components
import Table from '@/lib/ui/useable-components/table';
import RiderHeader from '../header';

// Utilities and Data
import { RIDER_TABLE_COLUMNS } from '@/lib/utils/constants/data.table.columns';
import { ridersData } from '@/lib/utils/dummy';

export default function RidersMain({
  setIsAddRiderVisible,
}: IRidersMainComponentsProps) {
  // Hooks
  const [selectedProducts, setSelectedProducts] = useState<
    IRiderDataComponentProps[]
  >([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: '' as string | null, matchMode: FilterMatchMode.CONTAINS },
  });

  // For global search
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const menuItems = [
    {
      label: 'Edit',
      command: () => console.log('Edit clicked'),
    },
    {
      label: 'Delete',
      command: () => console.log('Delete clicked'),
    },
  ];

  return (
    <div className="p-2 pt-5">
      <Table
        header={
          <RiderHeader
            setIsAddRiderVisible={setIsAddRiderVisible}
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={onGlobalFilterChange}
          />
        }
        data={ridersData}
        filters={filters}
        setSelectedData={setSelectedProducts}
        selectedData={selectedProducts}
        columns={RIDER_TABLE_COLUMNS({ menuItems })}
      />
    </div>
  );
}
