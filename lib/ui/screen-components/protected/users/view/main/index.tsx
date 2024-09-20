// Core
import { useState } from 'react';

// Prime React
import { FilterMatchMode } from 'primereact/api';

// Interface and Types
import { IQueryResult } from '@/lib/utils/interfaces';
import {
  IUserResponse,
  IUsersDataResponse,
} from '@/lib/utils/interfaces/users.interface';

// Components
import { USERS_TABLE_COLUMNS } from '@/lib/utils/constants';
import UserHeader from '../header';

//Toast
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import Table from '@/lib/ui/useable-components/table';

// GraphQL
import { getUsers } from '@/lib/api/graphql';
import { gql } from '@apollo/client';

const GET_USERS = gql`
  ${getUsers}
`;

export default function UsersMain() {
  // State - Table
  const [selectedProducts, setSelectedProducts] = useState<IUserResponse[]>([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: '' as string | null, matchMode: FilterMatchMode.CONTAINS },
  });

  // Query
  const { data } = useQueryGQL(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  }) as IQueryResult<IUsersDataResponse | undefined, undefined>;

  // For global search
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  return (
    <div className="p-2 pt-5">
      <Table
        header={
          <UserHeader
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={onGlobalFilterChange}
          />
        }
        data={data?.users || []}
        filters={filters}
        setSelectedData={setSelectedProducts}
        selectedData={selectedProducts}
        columns={USERS_TABLE_COLUMNS}
      />
    </div>
  );
}
