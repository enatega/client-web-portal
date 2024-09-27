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
import { useContext, useEffect, useMemo, useState } from 'react';

//prime react
import { FilterMatchMode } from 'primereact/api';
import { Dropdown, DropdownProps } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';

//components
import { ToastContext } from '@/lib/context/toast.context';
import Table from '@/lib/ui/useable-components/table';
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
import WithdrawRequestTableHeader from '../header/table-header';

export default function WithdrawRequestsMain() {
  //toast
  const { showToast } = useContext(ToastContext);
  //states
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<IWithDrawRequest[]>([]);
  const [requests, setRequests] = useState<IWithDrawRequest[]>([]);

  //queries
  const { fetch, data, loading } = useLazyQueryQL(GET_ALL_WITHDRAW_REQUESTS, {
    fetchPolicy: 'cache-and-network',
  }) as ILazyQueryResult<IGetWithDrawRequestsData | undefined, undefined>;

  //filters
  const filters = {
    global: { value: '', matchMode: FilterMatchMode.CONTAINS },
    status: {
      value: selectedActions.length > 0 ? selectedActions : null,
      matchMode: FilterMatchMode.IN,
    },
  };
  const [globalFilterValue, setGlobalFilterValue] = useState('');

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

  return (
    <div className="w-full">
      {data?.getAllWithdrawRequests && (
        <Table
          data={data.getAllWithdrawRequests.data ?? []}
          columns={columns}
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          isSelectable={true}
          header={
            <WithdrawRequestTableHeader
              globalFilterValue={globalFilterValue}
              onGlobalFilterChange={(e) => setGlobalFilterValue(e.target.value)}
              selectedActions={selectedActions}
              setSelectedActions={setSelectedActions}
            />
          }
          filters={filters}
          loading={loading}
        />
      )}
    </div>
  );
}
