// Core
import { useState } from 'react';

// Prime React
import { FilterMatchMode } from 'primereact/api';

// Interface and Types
import {
  IRiderResponse,
  IRidersDataResponse,
  IRidersMainComponentsProps,
} from '@/lib/utils/interfaces/rider.interface';

// Components
import CustomTextField from '@/lib/ui/useable-components/input-field';
import Table from '@/lib/ui/useable-components/table';
import { RIDER_TABLE_COLUMNS } from '@/lib/ui/useable-components/table/columns/rider-columns';

// Utilities and Data
import DeleteDialog from '@/lib/ui/useable-components/delete-dialog';
import { IActionMenuItem } from '@/lib/utils/interfaces/action-menu.interface';

//Toast
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import useToast from '@/lib/hooks/useToast';
import { IQueryResult } from '@/lib/utils/interfaces';

// GraphQL
import { DELETE_RIDER, GET_RIDERS } from '@/lib/api/graphql';
import { useMutation } from '@apollo/client';

export default function RidersMain({
  setIsAddRiderVisible,
  setRider,
}: IRidersMainComponentsProps) {
  // Hooks
  const { showToast } = useToast();

  // State - Table
  const [deleteId, setDeleteId] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<IRiderResponse[]>(
    []
  );
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: '' as string | null, matchMode: FilterMatchMode.CONTAINS },
  });

  // Query
  const { data, loading } = useQueryGQL(GET_RIDERS, {
    fetchPolicy: 'cache-and-network',
  }) as IQueryResult<IRidersDataResponse | undefined, undefined>;

  //Mutation
  const [mutateDelete, { loading: mutationLoading }] = useMutation(
    DELETE_RIDER,
    {
      refetchQueries: [{ query: GET_RIDERS }],
    }
  );

  // For global search
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const menuItems: IActionMenuItem<IRiderResponse>[] = [
    {
      label: 'Edit',
      command: (data?: IRiderResponse) => {
        if (data) {
          setIsAddRiderVisible(true);
          setRider(data);
        }
      },
    },
    {
      label: 'Delete',
      command: (data?: IRiderResponse) => {
        if (data) {
          setDeleteId(data._id);
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
        data={data?.riders || []}
        filters={filters}
        setSelectedData={setSelectedProducts}
        selectedData={selectedProducts}
        loading={loading}
        columns={RIDER_TABLE_COLUMNS({ menuItems })}
      />
      <DeleteDialog
        loading={mutationLoading}
        visible={!!deleteId}
        onHide={() => {
          setDeleteId('');
        }}
        onConfirm={() => {
          mutateDelete({
            variables: { id: deleteId },
            onCompleted: () => {
              showToast({
                type: 'success',
                title: 'Success!',
                message: 'Rider Deleted',
                duration: 3000,
              });
              setDeleteId('');
            },
          });
        }}
        message="Are you sure you want to delete this item?"
      />
    </div>
  );
}
