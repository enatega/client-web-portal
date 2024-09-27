import { FilterMatchMode } from 'primereact/api';
import { ChangeEvent, useState } from 'react';

// Grouping imports for better organization
import NotificationTable from '../../table';

export default function NotificationMain() {
  //filters
  const [filters, setFilters] = useState({
    global: { value: '', matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  //global filters change
  const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  return (
    <div className="p-3">
      <NotificationTable
        onGlobalFilterChange={onGlobalFilterChange}
        filters={filters}
        globalFilterValue={globalFilterValue}
      />
    </div>
  );
}
