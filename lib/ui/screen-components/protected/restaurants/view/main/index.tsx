'use client';

// Core
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApolloCache, ApolloError, useMutation } from '@apollo/client';

// PrimeReact
import { FilterMatchMode } from 'primereact/api';

// Context
import { ToastContext } from '@/lib/context/toast.context';

// Custom Hooks
import { useQueryGQL } from '@/lib/hooks/useQueryQL';

// Custom Components
import RestaurantsTableHeader from '../header/table-header';
import Table from '@/lib/ui/useable-components/table';
import DeleteDialog from '@/lib/ui/useable-components/delete-dialog';
import { RESTAURANT_TABLE_COLUMNS } from '@/lib/ui/useable-components/table/columns/restaurant-column';

// Constants and Interfaces
import {
  IActionMenuItem,
  IQueryResult,
  IRestaurantResponse,
  IRestaurantsResponseGraphQL,
} from '@/lib/utils/interfaces';

// GraphQL Queries and Mutations
import { GET_RESTAURANTS, HARD_DELETE_RESTAURANT } from '@/lib/api/graphql';

// Method
import { onUseLocalStorage } from '@/lib/utils/methods';
import { generateDummyRestaurants } from '@/lib/utils/dummy';

export default function RestaurantsMain() {
  // Context
  const { showToast } = useContext(ToastContext);
  // Hooks
  const router = useRouter();

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
  const { data, loading } = useQueryGQL(
    GET_RESTAURANTS,
    {},
    {
      debounceMs: 300,
    }
  ) as IQueryResult<IRestaurantsResponseGraphQL | undefined, undefined>;

  // API
  const [hardDeleteRestaurant, { loading: isHardDeleting }] = useMutation(
    HARD_DELETE_RESTAURANT,
    {
      onCompleted: () => {
        showToast({
          type: 'success',
          title: 'Restaurant Delete',
          message: `Restaurant has been deleted successfully.`,
          duration: 2000,
        });
      },
      onError: ({ networkError, graphQLErrors }: ApolloError) => {
        showToast({
          type: 'error',
          title: 'Restaurant Delete',
          message:
            graphQLErrors[0]?.message ??
            networkError?.message ??
            `Restaurant delete failed`,
          duration: 2500,
        });
      },
      update: (cache: ApolloCache<unknown>): void => {
        try {
          const cachedRestaurants = data?.restaurants ?? [];

          cache.writeQuery({
            query: GET_RESTAURANTS,
            data: {
              restaurants: [
                ...cachedRestaurants.filter(
                  (restaurant: IRestaurantResponse) =>
                    restaurant._id !== deleteId
                ),
              ],
            },
          });
        } finally {
          setDeleteId('');
        }
      },
    }
  );

  const handleDelete = async (id: string) => {
    hardDeleteRestaurant({ variables: { id: id } });
  };

  // Constants
  const menuItems: IActionMenuItem<IRestaurantResponse>[] = [
    {
      label: 'View',
      command: (data?: IRestaurantResponse) => {
        if (data) {
          onUseLocalStorage('save', 'restaurantId', data?._id);
          router.push(`/admin/restaurant/`);
        }
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
    <div className="p-3">
      <Table
        header={
          <RestaurantsTableHeader
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={(e) => setGlobalFilterValue(e.target.value)}
            selectedActions={selectedActions}
            setSelectedActions={setSelectedActions}
          />
        }
        data={data?.restaurants || (loading ? generateDummyRestaurants() : [])}
        filters={filters}
        setSelectedData={setSelectedProducts}
        selectedData={selectedProducts}
        columns={RESTAURANT_TABLE_COLUMNS({ menuItems })}
        loading={loading}
      />

      <DeleteDialog
        loading={isHardDeleting}
        visible={!!deleteId}
        onHide={() => {
          setDeleteId('');
        }}
        onConfirm={() => {
          handleDelete(deleteId);
        }}
        message="Are you sure you want to delete this restaurant?"
      />
    </div>
  );
}
