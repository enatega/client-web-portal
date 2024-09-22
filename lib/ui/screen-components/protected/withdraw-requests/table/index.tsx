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
import { IDropdownSelectItem } from '@/lib/utils/interfaces';
import { IColumnConfig } from '@/lib/utils/interfaces/table.interface';
import {
  faArrowsRotate,
  faCircleXmark,
  faDashboard,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, DropdownProps } from 'primereact/dropdown';
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
  const [options, setOptions] = useState<IDropdownSelectItem[]>([
    {
      code: 'REQUESTED',
      label: 'Requested',
      body: () => <Tag value="Requested" severity="info" rounded />,
    },
    {
      code: 'TRANSFERRED',
      label: 'Transferred',
      body: () => <Tag value="Transferred" severity="success" rounded />,
    },
    {
      code: 'CANCELLED',
      label: 'Cancelled',
      body: () => <Tag value="Cancelled" severity="danger" rounded />,
    },
  ]);

  // find severity
  function findSeverity(code: string) {
    switch (code) {
      case 'REQUESTED':
        return 'info';
      case 'TRANSFERRED':
        return 'success';
      case 'CANCELLED':
        return 'danger';
    }
  }

  //templates
  const valueTemplate = (option: IDropdownSelectItem) => {
    console.log({ option });
    return (
      <Tag
        severity={findSeverity(option?.code)}
        value={option?.label}
        rounded
      />
    );
  };
  const itemTemplate = (option: IDropdownSelectItem) => {
    console.log({ option });
    return (
      <div className="flex gap-2">
        <FontAwesomeIcon
          icon={
            option.code === 'CANCELLED'
              ? faCircleXmark
              : option.code === 'TRANSFERRED'
                ? faArrowsRotate
                : option.code === 'REQUESTED'
                  ? faPaperPlane
                  : faDashboard
          }
          color={option.code === 'CANCELLED' ? 'red' : 'black'}
        />
        <span>{option.label}</span>
      </div>
    );
  };

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
        <>
          <Dropdown
            value={options?.find((option) => option?.code === rowData.status)}
            options={options}
            onChange={(e: DropdownProps) => setOptions(e.value)}
            itemTemplate={itemTemplate}
            valueTemplate={valueTemplate}
          />
        </>
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
