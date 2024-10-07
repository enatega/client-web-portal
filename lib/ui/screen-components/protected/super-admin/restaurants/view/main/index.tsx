'use client';

// Core
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApolloCache, ApolloError, useMutation } from '@apollo/client';

// PrimeReact
import { FilterMatchMode } from 'primereact/api';

// Context
import { ToastContext } from '@/lib/context/global/toast.context';

// Custom Hooks
import { useQueryGQL } from '@/lib/hooks/useQueryQL';

// Custom Components
import RestaurantsTableHeader from '../header/table-header';
import Table from '@/lib/ui/useable-components/table';
import CustomDialog from '@/lib/ui/useable-components/delete-dialog';
import { RESTAURANT_TABLE_COLUMNS } from '@/lib/ui/useable-components/table/columns/restaurant-column';

// Constants and Interfaces
import {
  IActionMenuItem,
  IQueryResult,
  IRestaurantResponse,
  IRestaurantsResponseGraphQL,
} from '@/lib/utils/interfaces';

// GraphQL Queries and Mutations
import {
  DUPLICATE_RESTAURANT,
  GET_CLONED_RESTAURANTS,
  GET_RESTAURANTS,
  HARD_DELETE_RESTAURANT,
} from '@/lib/api/graphql';

// Method
import { onUseLocalStorage } from '@/lib/utils/methods';
import { generateDummyRestaurants } from '@/lib/utils/dummy';
import { RestaurantsContext } from '@/lib/context/super-admin/restaurants.context';

export default function RestaurantsMain() {
  // Context
  const { showToast } = useContext(ToastContext);
  const { currentTab } = useContext(RestaurantsContext);
  // Hooks
  const router = useRouter();

  const [deleteId, setDeleteId] = useState('');
  const [duplicateId, setDuplicateId] = useState('');
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
    currentTab === 'Actual' ? GET_RESTAURANTS : GET_CLONED_RESTAURANTS,
    {},
    {
      fetchPolicy: currentTab === 'Actual' ? 'cache-first' : 'network-only',
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
        setDeleteId('');
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
        setDeleteId('');
      },
      update: (cache: ApolloCache<unknown>): void => {
        try {
          const cachedRestaurants =
            currentTab === 'Actual'
              ? data?.restaurants
              : data?.getClonedRestaurants;

          if (currentTab === 'Actual') {
            cache.writeQuery({
              query: GET_RESTAURANTS,
              data: {
                restaurants: [
                  ...(cachedRestaurants || []).filter(
                    (restaurant: IRestaurantResponse) =>
                      restaurant._id !== deleteId
                  ),
                ],
              },
            });
          } else {
            cache.writeQuery({
              query: GET_CLONED_RESTAURANTS,
              data: {
                getClonedRestaurants: [
                  ...(cachedRestaurants || []).filter(
                    (restaurant: IRestaurantResponse) =>
                      restaurant._id !== deleteId
                  ),
                ],
              },
            });
          }
        } finally {
          setDeleteId('');
        }
      },
    }
  );

  const [duplicateRestaurant, { loading: isDuplicating }] = useMutation(
    DUPLICATE_RESTAURANT,
    {
      onCompleted: () => {
        showToast({
          type: 'success',
          title: 'Restaurant Duplicate',
          message: `Restaurant has been duplicated successfully.`,
          duration: 2000,
        });
        setDuplicateId('');
      },
      onError: ({ networkError, graphQLErrors }: ApolloError) => {
        showToast({
          type: 'error',
          title: 'Restaurant Duplicate',
          message:
            graphQLErrors[0]?.message ??
            networkError?.message ??
            `Restaurant duplicate failed`,
          duration: 2500,
        });
        setDuplicateId('');
      },
    }
  );

  const handleDelete = async (id: string) => {
    try {
      hardDeleteRestaurant({ variables: { id: id } });
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Restaurant Delete',
        message: `Restaurant delete failed.`,
      });
      setDeleteId('');
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      duplicateRestaurant({ variables: { id: id } });
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Restaurant Duplicate',
        message: `Restaurant duplicate failed.`,
      });
      setDuplicateId('');
    }
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
      label: 'Duplicate',
      command: (data?: IRestaurantResponse) => {
        if (data) {
          setDuplicateId(data._id);
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

  const _restaurants =
    currentTab === 'Actual' ? data?.restaurants : data?.getClonedRestaurants;

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
        data={loading ? generateDummyRestaurants() : (_restaurants ?? [])}
        filters={filters}
        setSelectedData={setSelectedProducts}
        selectedData={selectedProducts}
        columns={RESTAURANT_TABLE_COLUMNS({ menuItems })}
        loading={loading}
      />

      <CustomDialog
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

      <CustomDialog
        loading={isDuplicating}
        visible={!!duplicateId}
        onHide={() => {
          setDuplicateId('');
        }}
        onConfirm={() => {
          handleDuplicate(duplicateId);
        }}
        title="Duplicate Restaurant"
        message="Are you sure you want to duplicate this restaurant?"
        buttonConfig={{
          primaryButtonProp: {
            bgColor: 'bg-blue-500',
          },
        }}
      />
    </div>
  );
}
