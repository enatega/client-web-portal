//components
import WithdrawTable from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/withdraw-requests/WithdrawTable';
import HeaderText from '@/lib/ui/useable-components/header-text';

//interfaces
import { IEditState, ILazyQueryResult } from '@/lib/utils/interfaces';
import {
  IGetWithDrawRequestsData,
  IWithDrawRequest,
} from '@/lib/utils/interfaces/withdraw-request.interface';

//queries
import { GET_ALL_WITHDRAW_REQUESTS } from '@/lib/api/graphql';

//prime react
import { FilterMatchMode } from 'primereact/api';

//hooks
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import { ChangeEvent, useEffect, useState } from 'react';

export default function WithdrawRequestScreen() {
  //states
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [requests, setRequests] = useState<IWithDrawRequest[]>([]);
  const [isDeleting, setIsDeleting] = useState<IEditState<IWithDrawRequest>>({
    bool: false,
    data: {
      _id: '',
      requestAmount: 0,
      requestId: '',
      requestTime: '',
      rider: {
        _id: '',
        currentWalletAmount: 0,
        name: '',
      },
      status: false,
    },
  });
  const [isEditing, setIsEditing] = useState<IEditState<IWithDrawRequest>>({
    bool: false,
    data: {
      _id: '',
      requestAmount: 0,
      requestId: '',
      requestTime: '',
      rider: {
        _id: '',
        currentWalletAmount: 0,
        name: '',
      },
      status: false,
    },
  });
  const [visible, setVisible] = useState(false);

  //queries
  const { fetch, data, loading } = useLazyQueryQL(
    GET_ALL_WITHDRAW_REQUESTS,
    {}
  ) as ILazyQueryResult<IGetWithDrawRequestsData | undefined, undefined>;

  //options
  let statusOptions = [
    {
      label: '',
      code: '',
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

  // useEffects
  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (data) {
      console.log({
        data: data.getAllWithdrawRequests.data,
        isEditing,
        loading,
      });

      setRequests(data.getAllWithdrawRequests?.data);
    }
  }, [data]);

  return (
    <div className="flex flex-col mb-3 gap-6 overflow-y-auto h-full">
      <div className="flex justify-between items-center p-2 w-full">
        <HeaderText text="Withdraw Requests" className="mx-5" />
      </div>
      <WithdrawTable
        data={requests}
        loading={loading}
        filters={filters}
        isDeleting={isDeleting}
        setRequests={setRequests}
        setIsDeleting={setIsDeleting}
        setIsEditing={setIsEditing}
        setVisible={setVisible}
        visible={visible}
        globalFilterValue={globalFilterValue}
        onGlobalFilterChange={onGlobalFilterChange}
        selectedStatuses={selectedStatuses}
        setSelectedStatuses={setSelectedStatuses}
        statusOptions={statusOptions}
      />
    </div>
  );
}
