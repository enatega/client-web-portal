// Core
import { useState } from 'react';

// PrimeReact
import { FilterMatchMode } from 'primereact/api';

// Apollo Client
import { useMutation } from '@apollo/client';

// Custom Hooks
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import useToast from '@/lib/hooks/useToast';

// Custom Components
import DeleteDialog from '@/lib/ui/useable-components/delete-dialog';
import Table from '@/lib/ui/useable-components/table';

// Constants and Interfaces
import { RESTAURANT_TABLE_COLUMNS } from '@/lib/utils/constants';
import {
  IQueryResult,
  IRestaurantResponse,
  IRestaurantsMainComponentsProps,
  IRestaurantsResponseGraphQL,
} from '@/lib/utils/interfaces';
import { IActionMenuItem } from '@/lib/utils/interfaces/action-menu.interface';

// GraphQL Queries and Mutations
import { DELETE_RESTAURANT, GET_RESTAURANTS } from '@/lib/api/graphql';
import RestaurantsTableHeader from '../header/table-header';

export default function BannersMain({
  setIsAddRestaurantVisible,
}: IRestaurantsMainComponentsProps) {
  // Hooks
  const { showToast } = useToast();

  // State - Table
  const [deleteId, setDeleteId] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<
    IRestaurantResponse[]
  >([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [selectedActions, setSelectedActions] = useState<string[]>([]);

  const filters = {
    global: { value: globalFilterValue, matchMode: FilterMatchMode.CONTAINS },
    action: {
      value: selectedActions.length > 0 ? selectedActions : null,
      matchMode: FilterMatchMode.IN,
    },
  };

  //Query
  const { data } = useQueryGQL(GET_RESTAURANTS, {
    fetchPolicy: 'cache-and-network',
  }) as IQueryResult<IRestaurantsResponseGraphQL | undefined, undefined>;

  //Mutation
  const [mutateDelete, { loading: mutationLoading }] = useMutation(
    DELETE_RESTAURANT,
    {
      refetchQueries: [{ query: GET_RESTAURANTS }],
    }
  );

  // Menu Items
  const menuItems: IActionMenuItem<IRestaurantResponse>[] = [
    {
      label: 'Edit',
      command: (data?: IRestaurantResponse) => {
        console.log(data);
      },
    },
    {
      label: 'Delete',
      command: (data?: IRestaurantResponse) => {
        if (data) {
          setDeleteId(data._id);
        }
      },
    },
  ];

  return (
    <div className="pt-5">
      <Table
        header={
          <RestaurantsTableHeader
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={(e) => setGlobalFilterValue(e.target.value)}
            selectedActions={selectedActions}
            setSelectedActions={setSelectedActions}
            setIsAddRestaurantVisible={setIsAddRestaurantVisible}
          />
        }
        data={data?.restaurants || []}
        filters={filters}
        setSelectedData={setSelectedProducts}
        selectedData={selectedProducts}
        columns={RESTAURANT_TABLE_COLUMNS({ menuItems })}
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
                message: 'Banner Deleted',
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
