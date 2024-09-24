// Core
import { useState } from 'react';

// Prime React
import { FilterMatchMode } from 'primereact/api';

// Interface and Types
import {
  IQueryResult,
  IStaffGQLResponse,
  IStaffMainComponentsProps,
  IStaffResponse,
} from '@/lib/utils/interfaces';

// Components
import CustomTextField from '@/lib/ui/useable-components/input-field';
import Table from '@/lib/ui/useable-components/table';
import { STAFF_TABLE_COLUMNS } from '@/lib/ui/useable-components/table/columns/staff-columns';

// Utilities and Data
import { IActionMenuItem } from '@/lib/utils/interfaces/action-menu.interface';

// GraphQL
import { GET_STAFFS } from '@/lib/api/graphql/queries/staff';
import { useQueryGQL } from '@/lib/hooks/useQueryQL';

export default function StaffMain({
  setIsAddStaffVisible,
  setStaff,
}: IStaffMainComponentsProps) {
  // States (Data Table)
  const [selectedProducts, setSelectedProducts] = useState<IStaffResponse[]>(
    []
  );
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: '' as string | null, matchMode: FilterMatchMode.CONTAINS },
  });

  // Query
  const { data, loading } = useQueryGQL(GET_STAFFS, {
    fetchPolicy: 'cache-and-network',
  }) as IQueryResult<IStaffGQLResponse | undefined, undefined>;

  // For global search
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const menuItems: IActionMenuItem<IStaffResponse>[] = [
    {
      label: 'Edit',
      command: (data?: IStaffResponse) => {
        if (data) {
          setIsAddStaffVisible(true);
          setStaff(data);
        }
      },
    },
  ];

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
        data={data?.staffs || []}
        filters={filters}
        setSelectedData={setSelectedProducts}
        selectedData={selectedProducts}
        loading={loading}
        columns={STAFF_TABLE_COLUMNS({ menuItems })}
      />
    </div>
  );
}
