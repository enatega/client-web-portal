import { INotificationMainProps } from '@/lib/utils/interfaces/notification.interface';
import { FilterMatchMode } from 'primereact/api';
import { ChangeEvent, useState } from 'react';
import NotificationForm from '../../form';
import NotificationTable from '../../table';

export default function NotificationMain({
  visible,
  setVisible,
}: INotificationMainProps) {
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
    <div>
      <NotificationForm setVisible={setVisible} visible={visible} />
      <NotificationTable
        onGlobalFilterChange={onGlobalFilterChange}
        filters={filters}
        globalFilterValue={globalFilterValue}
      />
    </div>
  );
}
