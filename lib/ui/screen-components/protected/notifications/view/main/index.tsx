//Interfaces
import { INotification } from '@/lib/utils/interfaces/notification.interface';
import { IColumnConfig } from '@/lib/utils/interfaces/table.interface';

//Prime react
import { FilterMatchMode } from 'primereact/api';

//Hooks
import { ChangeEvent, useState } from 'react';

//Components
import NotificationTableHeader from '../header/table-header';
import Table from '@/lib/ui/useable-components/table';
import { generateDummyNotifications } from '@/lib/utils/dummy';
import CustomButton from '@/lib/ui/useable-components/button';

export default function NotificationMain() {
  // States
  const [selectedActions, setSelectedActions] = useState<string[]>([]);

  // Filters
  const [filters, setFilters] = useState({
    global: { value: '', matchMode: FilterMatchMode.CONTAINS },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState('');

  // Global filters change
  const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  // Columns
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
      headerName: 'Change Status',
      body: () => {
        return (
          <CustomButton
            onClick={() => {}}
            label="Resend"
            loading={false}
            type="button"
            className="block self-end"
          />
        );
      },
    },
  ];

  return (
    <div className="p-3">
      <Table
        columns={columns}
        data={generateDummyNotifications()}
        selectedData={[]}
        setSelectedData={() => {}}
        header={
          <NotificationTableHeader
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={onGlobalFilterChange}
            selectedActions={selectedActions}
            setSelectedActions={setSelectedActions}
          />
        }
        filters={filters}
      />
    </div>
  );
}
