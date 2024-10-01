//Prime react
import { FilterMatchMode } from 'primereact/api';

//Hooks
import { ChangeEvent, useState } from 'react';

//Components
import NotificationTableHeader from '../header/table-header';
import Table from '@/lib/ui/useable-components/table';
import { generateDummyNotifications } from '@/lib/utils/dummy';
import { NOTIFICATIONS_TABLE_COLUMNS } from '@/lib/ui/useable-components/table/columns/notification-columns';

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

  return (
    <div className="p-3">
      <Table
        columns={NOTIFICATIONS_TABLE_COLUMNS()}
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
