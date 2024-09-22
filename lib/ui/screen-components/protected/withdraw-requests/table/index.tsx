//components

//contexts

//interfaces
import {
  IWithDrawRequest,
  IWithDrawRequestsTableProps,
} from '@/lib/utils/interfaces/withdraw-request.interface';

//hooks
import { useState } from 'react';

//icons
import Table from '@/lib/ui/useable-components/table';
import TableHeader from '@/lib/ui/useable-components/table-header';
import { IColumnConfig } from '@/lib/utils/interfaces/table.interface';
import { Tag } from 'primereact/tag';

export default function WithdrawTable({
  data,
  loading,
  filters,
  globalFilterValue,
  onGlobalFilterChange,
  statusOptions,
  setSelectedStatuses,
  selectedStatuses,
}: IWithDrawRequestsTableProps) {
  //toast
  //   const { showToast } = useContext(ToastContext);

  const [selectedData, setSelectedData] = useState<IWithDrawRequest[]>([]);

  //columns
  const requestsColumns: IColumnConfig<IWithDrawRequest>[] = [
    {
      headerName: 'Request ID',
      propertyName: 'requestId',
    },
    {
      headerName: 'Rider',
      propertyName: 'rider.name',
    },
    {
      headerName: 'Amount',
      propertyName: 'requestAmount',
    },
    {
      headerName: 'Date',
      propertyName: 'requestTime',
    },
    {
      headerName: 'Status',
      propertyName: 'status',
      body: (rowData: IWithDrawRequest) => (
        <Tag
          className="mr-2"
          icon="pi pi-user"
          value={rowData.status}
          rounded
        />
      ),
    },
  ];
  return (
    <Table
      columns={requestsColumns}
      data={data ?? []}
      selectedData={selectedData}
      setSelectedData={(e) => setSelectedData(e as IWithDrawRequest[])}
      filters={filters}
      loading={loading}
      header={
        <TableHeader
          globalFilterValue={globalFilterValue}
          onGlobalFilterChange={onGlobalFilterChange}
          selectedStatuses={selectedStatuses}
          setSelectedStatuses={setSelectedStatuses}
          statusOptions={statusOptions}
        />
      }
    />
  );
}
