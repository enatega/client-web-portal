import { GET_ALL_WITHDRAW_REQUESTS } from '@/lib/api/graphql';
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import { ILazyQueryResult } from '@/lib/utils/interfaces';
import {
  IGetWithDrawRequestsData,
  IWithDrawRequest,
} from '@/lib/utils/interfaces/withdraw-request.interface';
import { FilterMatchMode } from 'primereact/api';
import { ChangeEvent, useEffect, useState } from 'react';
import WithdrawTable from '../body/table';

export default function WithdrawRequestsMain() {
  //states
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [requests, setRequests] = useState<IWithDrawRequest[]>([]);

  //queries
  const { fetch, data, loading } = useLazyQueryQL(GET_ALL_WITHDRAW_REQUESTS, {
    fetchPolicy: 'network-only',
  }) as ILazyQueryResult<IGetWithDrawRequestsData | undefined, undefined>;

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
      setRequests(data.getAllWithdrawRequests?.data);
    }
  }, [data]);
  return (
    <div className="w-full">
      <WithdrawTable
        data={requests ?? []}
        globalFilterValue={globalFilterValue}
        loading={loading}
        onGlobalFilterChange={onGlobalFilterChange}
        selectedStatuses={selectedStatuses}
        setRequests={setRequests}
        setSelectedStatuses={setSelectedStatuses}
        statusOptions={statusOptions}
        filters={filters}
      />
    </div>
  );
}
