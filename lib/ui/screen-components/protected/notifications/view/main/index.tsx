//interfaces
import {
  INotification,
} from '@/lib/utils/interfaces/notification.interface';
import { IColumnConfig } from '@/lib/utils/interfaces/table.interface';

//prime react
import { FilterMatchMode } from 'primereact/api';

//hooks
import { ChangeEvent, useState } from 'react';

//components
import Table from '@/lib/ui/useable-components/table';
import TableHeader from '@/lib/ui/useable-components/table-header';

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
  //columns
  const columns: IColumnConfig<INotification>[] = [
    {
      propertyName: 'title',
      headerName: 'Title',
    },
    {
      propertyName: 'description',
      headerName: 'description',
    },
    {
      propertyName: 'createdAt',
      headerName: 'Date',
    },
    {
      propertyName: 'status',
      headerName: 'Status',
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        data={[]}
        selectedData={[]}
        setSelectedData={() => {}}
        header={
          <TableHeader
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={onGlobalFilterChange}
            selectedStatuses={[]}
            setSelectedStatuses={() => {}}
            statusOptions={[]}
          />
        }
        filters={filters}
      />
    </div>
  );
}
