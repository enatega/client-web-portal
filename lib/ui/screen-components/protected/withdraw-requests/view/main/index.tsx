import { GET_ALL_WITHDRAW_REQUESTS } from '@/lib/api/graphql';
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import { IEditState, ILazyQueryResult } from '@/lib/utils/interfaces';
import {
  IGetWithDrawRequestsData,
  IWithDrawRequest,
} from '@/lib/utils/interfaces/withdraw-request.interface';
import { FilterMatchMode } from 'primereact/api';
import { ChangeEvent, useEffect, useState } from 'react';
import WithdrawTable from '../../table';

export default function WithdrawRequestsMain() {
  //states
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [requests, setRequests] = useState<IWithDrawRequest[]>([]);
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
    <div>
      <WithdrawTable
        data={requests ?? []}
        globalFilterValue={globalFilterValue}
        loading={loading}
        onGlobalFilterChange={onGlobalFilterChange}
        selectedStatuses={selectedStatuses}
        setIsEditing={setIsEditing}
        setRequests={setRequests}
        setSelectedStatuses={setSelectedStatuses}
        statusOptions={statusOptions}
        filters={filters}
      />
    </div>
  );
}
