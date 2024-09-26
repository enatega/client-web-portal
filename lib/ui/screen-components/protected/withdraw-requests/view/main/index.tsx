//graphQL
import {
  GET_ALL_WITHDRAW_REQUESTS,
  UPDATE_WITHDRAW_REQUEST,
} from '@/lib/api/graphql';

//interfaces
import { IDropdownSelectItem, ILazyQueryResult } from '@/lib/utils/interfaces';
import {
  IGetWithDrawRequestsData,
  IWithDrawRequest,
} from '@/lib/utils/interfaces/withdraw-request.interface';

//hooks
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react';

//prime react
import { FilterMatchMode } from 'primereact/api';
import { Dropdown, DropdownProps } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';

//components
import { ToastContext } from '@/lib/context/toast.context';
import Table from '@/lib/ui/useable-components/table';
import TableHeader from '@/lib/ui/useable-components/table-header';
import { IColumnConfig } from '@/lib/utils/interfaces/table.interface';
import { useMutation } from '@apollo/client';
import {
  faArrowsRotate,
  faCircleXmark,
  faDashboard,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function WithdrawRequestsMain() {
  //toast
  const { showToast } = useContext(ToastContext);
  //states
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<IWithDrawRequest[]>([]);
  const [requests, setRequests] = useState<IWithDrawRequest[]>([]);

  //queries
  const { fetch, data, loading } = useLazyQueryQL(GET_ALL_WITHDRAW_REQUESTS, {
    fetchPolicy: 'network-only',
  }) as ILazyQueryResult<IGetWithDrawRequestsData | undefined, undefined>;

  //options
  let statusOptions = [
    {
      label: 'Requested',
      code: 'REQUESTED',
    },
    {
      label: 'Transferred',
      code: 'TRANSFERRED',
    },
    {
      label: 'Cancelled',
      code: 'CANCELLED',
    },
  ];

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

  //status dropdown options
  const options = useMemo(
    () => [
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
    ],
    []
  );
  //mutation
  const [updateWithdrawReqStatus] = useMutation(UPDATE_WITHDRAW_REQUEST, {
    onError: (err) => {
      showToast({
        type: 'error',
        title: 'Update Withdraw Request',
        message:
          err?.graphQLErrors[0]?.message ||
          err?.networkError?.message ||
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
    const filteredRequests: IWithDrawRequest[] | undefined = requests?.filter(
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
  const columns: IColumnConfig<IWithDrawRequest>[] = [
    {
      headerName: 'Request Id',
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
        <Dropdown
          value={options?.find((option) => option?.code === rowData.status)}
          options={options}
          onChange={(e) => handleDropDownChange(e, rowData)}
          itemTemplate={itemTemplate}
          valueTemplate={valueTemplate}
        />
      ),
    },
  ];

  // useEffects
  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (data) {
      setRequests(data.getAllWithdrawRequests?.data);
    }
  }, [data]);

  useEffect(() => {
    if (selectedStatuses.length > 0) {
      const spreadStringStatus = selectedStatuses.join('');
      const filtered_arr = requests.filter((request) =>
        spreadStringStatus.includes(request.status)
      );
      setRequests(filtered_arr);
    } else {
      setRequests(data?.getAllWithdrawRequests.data ?? []);
    }
  }, [selectedStatuses, requests]);
  return (
    <div className="w-full">
      <Table
        data={requests ?? []}
        columns={columns}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        isSelectable={true}
        header={
          <TableHeader
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={onGlobalFilterChange}
            setSelectedStatuses={setSelectedStatuses}
            selectedStatuses={selectedStatuses}
            statusOptions={statusOptions}
          />
        }
        filters={filters}
        loading={loading}
      />
    </div>
  );
}
