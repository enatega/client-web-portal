// Core
import { useMutation } from '@apollo/client';
import { useContext, useState } from 'react';

// Prime React
import { FilterMatchMode } from 'primereact/api';

// Interface and Types
import {
  IActionMenuItem,
  // IActionMenuItem,
  IFoodByRestaurantResponse,
  IFoodGridItem,
  IQueryResult,
} from '@/lib/utils/interfaces';

// Components
import Table from '@/lib/ui/useable-components/table';
import CategoryTableHeader from '../header/table-header';

// Utilities and Data
import DeleteDialog from '@/lib/ui/useable-components/delete-dialog';
import { generateDummyFoods } from '@/lib/utils/dummy';

// Context
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import useToast from '@/lib/hooks/useToast';

// GraphQL
import {
  DELETE_FOOD,
} from '@/lib/api/graphql';
import { GET_FOODS_BY_RESTAURANT_ID } from '@/lib/api/graphql/queries';

// Context
import { RestaurantLayoutContext } from '@/lib/context/layout-restaurant.context';
import { FOODS_TABLE_COLUMNS } from '@/lib/ui/useable-components/table/columns/foods-columns';
import { onTransformRetaurantsByIdToFoods } from '@/lib/utils/methods/transformer';

export default function FoodsMain() {
  // Context
  const { restaurantLayoutContextData } = useContext(RestaurantLayoutContext);
  const restaurantId = restaurantLayoutContextData?.restaurantId || '';

  // Hooks
  const { showToast } = useToast();

  // State - Table
  const [foodItems, setFoodItems] = useState<IFoodGridItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<IFoodGridItem[]>([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: '' as string | null, matchMode: FilterMatchMode.CONTAINS },
  });

  // Query
  const { loading } = useQueryGQL(
    GET_FOODS_BY_RESTAURANT_ID,
    { id: restaurantId },
    {
      fetchPolicy: 'network-only',
      enabled: !!restaurantId,
      onCompleted: onFetchFoodsByRestaurantCompleted,
      onError: onErrorFetchFoodsByRestaurant,
    }
  ) as IQueryResult<IFoodByRestaurantResponse | undefined, undefined>;

  //Mutation
  const [deleteFood, { loading: mutationLoading }] = useMutation(DELETE_FOOD, {
    variables: {
      id: deleteId,
      restaurant: restaurantId,
    },
    refetchQueries: [
      {
        query: GET_FOODS_BY_RESTAURANT_ID,
        variables: { id: restaurantId },
      },
    ],
  });

  // Handlers
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  // Restaurant Profile Complete
  function onFetchFoodsByRestaurantCompleted(data: unknown) {
    setIsLoading(true);
    const items = onTransformRetaurantsByIdToFoods(
      data as IFoodByRestaurantResponse
    );
    setFoodItems(items);
    setIsLoading(false);
  }
  // Restaurant Zone Info Error
  function onErrorFetchFoodsByRestaurant() {
    showToast({
      type: 'error',
      title: 'Foods Fetch',
      message: 'Foods fetch failed',
      duration: 2500,
    });
  }

  // Constants
  const menuItems: IActionMenuItem<IFoodGridItem>[] = [
    {
      label: 'Edit',
      command: (data?: IFoodGridItem) => {
        if (data) {
          //setIsAddFoodVisible(true);
          //setFood(data);
        }
      },
    },
    {
      label: 'Delete',
      command: (data?: IFoodGridItem) => {
        if (data) {
          setDeleteId(data._id ?? "");
        }
      },
    },
  ];

  return (
    <div className="p-3">
      <Table
        header={
          <CategoryTableHeader
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={onGlobalFilterChange}
          />
        }
        data={foodItems || (loading || isLoading ? generateDummyFoods() : [])}
        filters={filters}
        setSelectedData={setSelectedProducts}
        selectedData={selectedProducts}
        loading={loading}
        columns={FOODS_TABLE_COLUMNS({ menuItems })}
      />
      <DeleteDialog
        loading={mutationLoading}
        visible={!!deleteId}
        onHide={() => {
          setDeleteId('');
        }}
        onConfirm={() => {
          deleteFood({
            variables: { id: deleteId },
            onCompleted: () => {
              showToast({
                type: 'success',
                title: 'Delete Option',
                message: 'Option has been deleted successfully.',
                duration: 3000,
              });
              setDeleteId('');
            },
          });
        }}
        message="Are you sure you want to delete this option?"
      />
    </div>
  );
}
