// Core
import { useMutation } from '@apollo/client';
import { useContext, useEffect, useMemo, useState } from 'react';

// Prime React
import { FilterMatchMode } from 'primereact/api';

// Interface and Types
import {
  IActionMenuItem,
  IAddon,
  IAddonByRestaurantResponse,
  IDropdownSelectItem,
  // IActionMenuItem,
  IFoodByRestaurantResponse,
  IFoodGridItem,
  IQueryResult,
  IVariation,
} from '@/lib/utils/interfaces';

// Components
import Table from '@/lib/ui/useable-components/table';
import FoodsTableHeader from '../header/table-header';
import { FOODS_TABLE_COLUMNS } from '@/lib/ui/useable-components/table/columns/foods-columns';


// Utilities and Data
import DeleteDialog from '@/lib/ui/useable-components/delete-dialog';
import { generateDummyFoods } from '@/lib/utils/dummy';

// Context
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import { FoodsContext } from '@/lib/context/foods.context';
import { RestaurantLayoutContext } from '@/lib/context/layout-restaurant.context';

// Hooks
import useToast from '@/lib/hooks/useToast';

// GraphQL
import { DELETE_FOOD } from '@/lib/api/graphql';
import { GET_ADDONS_BY_RESTAURANT_ID, GET_FOODS_BY_RESTAURANT_ID } from '@/lib/api/graphql/queries';


// Methods
import { onTransformRetaurantsByIdToFoods } from '@/lib/utils/methods/transformer';



export default function FoodsMain() {
  // Context
  const { restaurantLayoutContextData } = useContext(RestaurantLayoutContext);
  const { onSetFoodContextData, onFoodFormVisible } = useContext(FoodsContext)
  const restaurantId = restaurantLayoutContextData?.restaurantId || '';

  // Hooks
  const { showToast } = useToast();

  // State - Table
  const [foodItems, setFoodItems] = useState<IFoodGridItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState({ id: "", categoryId: "" });
  const [selectedProducts, setSelectedProducts] = useState<IFoodGridItem[]>([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: '' as string | null, matchMode: FilterMatchMode.CONTAINS },
  });

  // Query
  const { data: foodsData, loading, refetch } = useQueryGQL(
    GET_FOODS_BY_RESTAURANT_ID,
    { id: restaurantId },
    {
      fetchPolicy: 'network-only',
      enabled: !!restaurantId,
      onError: onErrorFetchFoodsByRestaurant,
    }
  ) as IQueryResult<IFoodByRestaurantResponse | undefined, undefined>;

  const { data } = useQueryGQL(
    GET_ADDONS_BY_RESTAURANT_ID,
    { id: restaurantId },
    {
      fetchPolicy: 'network-only',
      enabled: !!restaurantId,
      //  onCompleted: onFetchAddonsByRestaurantCompleted,
      //  onError: onErrorFetchAddonsByRestaurant,
    }
  ) as IQueryResult<IAddonByRestaurantResponse | undefined, undefined>;


  //Mutation
  const [deleteFood, { loading: mutationLoading }] = useMutation(DELETE_FOOD, {
    variables: {
      id: deleteId,
      restaurant: restaurantId,
      categoryId: ""
    },
    onCompleted: () => {
      refetch()
    }
    /*  refetchQueries: [
       {
         query: GET_FOODS_BY_RESTAURANT_ID,
         fetchPolicy: 'network-only',
         variables: { id: restaurantId },
       },
     ], */
  });

  // Memoized Data
  const addons = useMemo(
    () =>
      data?.restaurant?.addons.map((addon: IAddon) => {
        return { label: addon.title, code: addon._id };
      }),
    [data?.restaurant?.addons]
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
  function onFetchFoodsByRestaurantCompleted() {

    if(!foodsData) return;

    setIsLoading(true);

    const items = onTransformRetaurantsByIdToFoods(
      foodsData ?? {} as IFoodByRestaurantResponse
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

          let _variation = null
          const _variations = data?.variations?.map(
            ({ discounted, ...variation }: IVariation) => {
              _variation = {...variation}
              delete _variation.__typename

              return {
                ..._variation,
                discount: discounted,
                addons: variation.addons.map((addonId: string) => {
                  return addons?.find((addon: IDropdownSelectItem) => addon.code === addonId) ?? {}
                }),
              };
            }
          ) ?? [];



          onSetFoodContextData({ food: { _id: data._id ?? null, data: data ?? {} as IFoodGridItem, variations: _variations }, isEditing: true })
          onFoodFormVisible(true)

        }
      },
    },
    {
      label: 'Delete',
      command: (data?: IFoodGridItem) => {
        if (data) {
          setDeleteId({ id: data._id, categoryId: data?.category?.code ?? "" });
        }
      },
    },
  ];


  // Use Effect 
  useEffect(() => {
    onFetchFoodsByRestaurantCompleted()
  }, [foodsData?.restaurant.categories])

  return (
    <div className="p-3">
      <Table
        header={
          <FoodsTableHeader
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
        visible={!!deleteId?.id}
        onHide={() => {
          setDeleteId({ id: "", categoryId: "" });
        }}
        onConfirm={() => {
          deleteFood({
            variables: { ...deleteId, restaurant: restaurantId },
            onCompleted: () => {
              showToast({
                type: 'success',
                title: 'Delete Food',
                message: 'Food has been deleted successfully.',
              });
              setDeleteId({ id: "", categoryId: "" });
            },
          });
        }}
        message="Are you sure you want to delete this option?"
      />
    </div>
  );
}
