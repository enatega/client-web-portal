//components

//contexts

//interfaces
import {
  IWithDrawRequest,
  IWithDrawRequestsTableProps,
} from '@/lib/utils/interfaces/withdraw-request.interface';

//hooks
import { useContext, useState } from 'react';

import Table from '@/lib/ui/useable-components/table';
import TableHeader from '@/lib/ui/useable-components/table-header';

//interfaces
import { IDropdownSelectItem } from '@/lib/utils/interfaces';
import { IColumnConfig } from '@/lib/utils/interfaces/table.interface';

//icons
import { UPDATE_WITHDRAW_REQUEST } from '@/lib/api/graphql';
import { ToastContext } from '@/lib/context/toast.context';
import { useMutation } from '@apollo/client';
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
  setRequests,
}: IWithDrawRequestsTableProps) {
  //toast
  const { showToast } = useContext(ToastContext);

  const [selectedData, setSelectedData] = useState<IWithDrawRequest[]>([]);
  const options = [
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
  ];
  //mutation
  const [updateWithdrawReqStatus] = useMutation(UPDATE_WITHDRAW_REQUEST, {
    onError: (err) => {
      showToast({
        type: 'error',
        title: 'Update Withdraw Request',
        message:
          err.graphQLErrors[0].message ||
          err.networkError?.message ||
          'Failed to update the request',
      });
    },
  });

  // find severity
  function findSeverity(code: string) {
    switch (code) {
      case 'REQUESTED':
        return 'info';
      case 'TRANSFERRED':
        return 'success';
      case 'CANCELLED':
        return 'danger';
      default:
        return 'warning';
    }
  }

  //templates
  const valueTemplate = (option: IDropdownSelectItem) => {
    return (
      <Tag
        severity={findSeverity(option?.code)}
        value={option?.label}
        rounded
      />
    );
  };
  const itemTemplate = (option: IDropdownSelectItem) => {
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

  // handle drop down change
  const handleDropDownChange = (
    e: DropdownProps,
    rowData: IWithDrawRequest
  ) => {
    const filteredRequests: IWithDrawRequest[] | undefined = data?.filter(
      (request) => request._id !== rowData._id
    );
    const newRequest: IWithDrawRequest = {
      _id: rowData._id,
      requestAmount: rowData.requestAmount,
      requestId: rowData.requestId,
      requestTime: rowData.requestTime,
      rider: rowData.rider,
      status: e.value.code,
    };
    if (filteredRequests) {
      updateWithdrawReqStatus({
        variables: {
          id: rowData._id,
          status: e.value.code,
        },
      });
      setRequests([newRequest, ...filteredRequests]);
      showToast({
        type: 'success',
        title: 'Update Withdraw Request',
        message: 'The withdraw request has been updated successfully',
      });
    }
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
      body: (rowData: IWithDrawRequest) => (
        <span>{new Date(rowData.requestTime).toLocaleDateString()}</span>
      ),
    },
    {
      headerName: 'Status',
      propertyName: 'status',
      body: (rowData: IWithDrawRequest) => (
        <>
          <Dropdown
            value={options?.find((option) => option?.code === rowData.status)}
            options={options}
            onChange={(e) => handleDropDownChange(e, rowData)}
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
      className="w-full"
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