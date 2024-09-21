//components
import { GET_ALL_WITHDRAW_REQUESTS } from '@/lib/api/graphql';
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import WithdrawTable from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/withdraw-requests/WithdrawTable';
import CustomActionActionButton from '@/lib/ui/useable-components/custom-action-button';
import HeaderText from '@/lib/ui/useable-components/header-text';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import { IEditState, ILazyQueryResult } from '@/lib/utils/interfaces';
import {
  IGetWithDrawRequestsData,
  IWithDrawRequest,
} from '@/lib/utils/interfaces/withdraw-request.interface';
import { gql, useQuery } from '@apollo/client';

//icons
import { faPlus } from '@fortawesome/free-solid-svg-icons';

//prime react
import { FilterMatchMode } from 'primereact/api';

//hooks
import { ChangeEvent, useEffect, useState } from 'react';

export default function WithdrawRequestScreen() {
  //states
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

  //testing
  const { loading: withdraw_request_loading, data: withdraw_request_data } =
    useQuery(gql`
      ${GET_ALL_WITHDRAW_REQUESTS}
    `);
  //queries
  const { fetch, data, loading, error } = useLazyQueryQL(
    GET_ALL_WITHDRAW_REQUESTS,
    {
      fetchPolicy: 'cache-and-network',
    }
  ) as ILazyQueryResult<IGetWithDrawRequestsData | undefined, undefined>;

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
        data: withdraw_request_data.getAllWithdrawRequests,
        isEditing,
        withdraw_request_loading,
      });

      console.log(error);
      setRequests(data.withdrawrequests);
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between items-center px-5 w-full">
        <HeaderText text="Withdraw Requests" className="mx-5" />
      </div>
      <div className="self-start flex items-center justify-center gap-x-3 m-3">
        <CustomTextField
          name="searchQuery"
          onChange={onGlobalFilterChange}
          value={globalFilterValue}
          showLabel={false}
          placeholder="Filter tasks..."
          type="text"
          className="w-app-bar-search-width h-custom-button"
        />
        <CustomActionActionButton
          Icon={faPlus}
          title="Action"
          handleOptionChange={() => {}}
          selectedOption={null}
          statusOptions={[{ label: '', code: '' }]}
          name="withdraw_requests"
        />
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
      />
    </div>
  );
}
