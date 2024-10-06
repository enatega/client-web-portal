//Prime react
import { FilterMatchMode } from 'primereact/api';

//Hooks
import { ChangeEvent, useEffect, useState } from 'react';
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';

//Components
import NotificationTableHeader from '../header/table-header';
import Table from '@/lib/ui/useable-components/table';

// Constants
import { generateDummyNotifications } from '@/lib/utils/dummy';
import { NOTIFICATIONS_TABLE_COLUMNS } from '@/lib/ui/useable-components/table/columns/notification-columns';

// GraphQL
import { GET_NOTIFICATIONS } from '@/lib/api/graphql';

// import { ToastContext } from '@/lib/context/toast.context';
import { ILazyQueryResult } from '@/lib/utils/interfaces';
import { IGetNotification } from '@/lib/utils/interfaces/notification.interface';

export default function NotificationMain() {
  // Toast
  // const { showToast } = useContext(ToastContext);

  // Queries
  const { data, loading, fetch } = useLazyQueryQL(GET_NOTIFICATIONS, {
    fetchPolicy: 'cache-and-network',
  }) as ILazyQueryResult<IGetNotification | undefined, undefined>;

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
    const _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  // UseEffects
  useEffect(() => {
    fetch();
  }, []);
  console.log(data?.notifications);
  return (
    <div className="p-3">
      <Table
        columns={NOTIFICATIONS_TABLE_COLUMNS()}
        data={data?.notifications ?? generateDummyNotifications()}
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
        loading={loading}
      />
    </div>
  );
}
