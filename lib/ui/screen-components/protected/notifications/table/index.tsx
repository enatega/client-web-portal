import Table from '@/lib/ui/useable-components/table';
import TableHeader from '@/lib/ui/useable-components/table-header';
import {
  INotification,
  INotificationTableProps,
} from '@/lib/utils/interfaces/notification.interface';
import { IColumnConfig } from '@/lib/utils/interfaces/table.interface';

export default function NotificationTable({
  globalFilterValue,
  onGlobalFilterChange,
  filters,
}: INotificationTableProps) {
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
  );
}
