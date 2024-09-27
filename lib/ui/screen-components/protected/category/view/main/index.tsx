// Core
import { useContext, useState } from 'react';

// Prime React
import { FilterMatchMode } from 'primereact/api';

// Interface and Types

// Components
import Table from '@/lib/ui/useable-components/table';
import { CATEGORY_TABLE_COLUMNS } from '@/lib/ui/useable-components/table/columns/category-columns';

// Utilities and Data
import DeleteDialog from '@/lib/ui/useable-components/delete-dialog';
import { IActionMenuItem } from '@/lib/utils/interfaces/action-menu.interface';

//Toast
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import useToast from '@/lib/hooks/useToast';
import {
  ICategory,
  ICategoryByRestaurantResponse,
  ICategoryMainComponentsProps,
  IQueryResult,
} from '@/lib/utils/interfaces';

// GraphQL
import {
  DELETE_CATEGORY,
  GET_CATEGORY_BY_RESTAURANT_ID,
} from '@/lib/api/graphql';
import { RestaurantLayoutContext } from '@/lib/context/layout-restaurant.context';
import { generateDummyCategories } from '@/lib/utils/dummy';
import { useMutation } from '@apollo/client';
import CategoryTableHeader from '../header/table-header';

export default function CategoryMain({
  setIsAddCategoryVisible,
  setCategory,
}: ICategoryMainComponentsProps) {
  // Context
  const { restaurantLayoutContextData } = useContext(RestaurantLayoutContext);
  const restaurantId = restaurantLayoutContextData?.restaurantId || '';

  // Hooks
  const { showToast } = useToast();

  // State - Table
  const [deleteId, setDeleteId] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<ICategory[]>([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: '' as string | null, matchMode: FilterMatchMode.CONTAINS },
  });

  // Query
  const { data, loading } = useQueryGQL(
    GET_CATEGORY_BY_RESTAURANT_ID,
    { id: restaurantId },
    {
      fetchPolicy: 'network-only',
      enabled: !!restaurantId,
      onCompleted: onFetchCategoriesByRestaurantCompleted,
      onError: onErrorFetchCategoriesByRestaurant,
    }
  ) as IQueryResult<ICategoryByRestaurantResponse | undefined, undefined>;

  //Mutation
  const [deleteCategory, { loading: mutationLoading }] = useMutation(
    DELETE_CATEGORY,
    {
      variables: {
        id: deleteId,
        restaurant: restaurantId,
      },
      refetchQueries: [
        {
          query: GET_CATEGORY_BY_RESTAURANT_ID,
          variables: { id: restaurantId },
        },
      ],
    }
  );

  // Handlers
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  // Restaurant Profile Complete
  function onFetchCategoriesByRestaurantCompleted() {}
  // Restaurant Zone Info Error
  function onErrorFetchCategoriesByRestaurant() {
    showToast({
      type: 'error',
      title: 'Category Fetch',
      message: 'Categories fetch failed',
      duration: 2500,
    });
  }

  // Constants
  const menuItems: IActionMenuItem<ICategory>[] = [
    {
      label: 'Edit',
      command: (data?: ICategory) => {
        if (data) {
          setIsAddCategoryVisible(true);
          setCategory(data);
        }
      },
    },
    {
      label: 'Delete',
      command: (data?: ICategory) => {
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
          <CategoryTableHeader
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={onGlobalFilterChange}
          />
        }
        data={
          data?.restaurant?.categories ||
          (loading ? generateDummyCategories() : [])
        }
        filters={filters}
        setSelectedData={setSelectedProducts}
        selectedData={selectedProducts}
        loading={loading}
        columns={CATEGORY_TABLE_COLUMNS({ menuItems })}
      />
      <DeleteDialog
        loading={mutationLoading}
        visible={!!deleteId}
        onHide={() => {
          setDeleteId('');
        }}
        onConfirm={() => {
          deleteCategory({
            variables: { id: deleteId },
            onCompleted: () => {
              showToast({
                type: 'success',
                title: 'Delete Category',
                message: 'Category has been deleted successfully.',
                duration: 3000,
              });
              setDeleteId('');
            },
          });
        }}
        message="Are you sure you want to delete this category?"
      />
    </div>
  );
}
