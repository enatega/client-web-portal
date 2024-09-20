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
import CustomTextField from '@/lib/ui/useable-components/input-field';
import { USERS_TABLE_COLUMNS } from '@/lib/utils/constants';

//Toast
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import Table from '@/lib/ui/useable-components/table';

// GraphQL
import { GET_USERS } from '@/lib/api/graphql';

export default function UsersMain() {
  // State - Table
  const [selectedProducts, setSelectedProducts] = useState<IUserResponse[]>([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: '' as string | null, matchMode: FilterMatchMode.CONTAINS },
  });

  // Query
  const { data, loading } = useQueryGQL(GET_USERS, {
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
    <div className="mx-[-14px]">
      <Table
        header={
          <div className="w-fit mb-2 ml-[-8px] ">
            <CustomTextField
              type="text"
              name="riderFilter"
              maxLength={35}
              showLabel={false}
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
            />
          </div>
        }
        loading={loading}
        data={data?.users || []}
        filters={filters}
        setSelectedData={setSelectedProducts}
        selectedData={selectedProducts}
        columns={USERS_TABLE_COLUMNS}
      />
    </div>
  );
}
