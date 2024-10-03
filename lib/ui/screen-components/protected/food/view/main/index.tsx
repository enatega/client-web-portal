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
<<<<<<< HEAD
=======
import FoodsTableHeader from '../header/table-header';
import { FOODS_TABLE_COLUMNS } from '@/lib/ui/useable-components/table/columns/foods-columns';
>>>>>>> fa2f4db90be90a05bfdcf7053b263953a4812c79

// Utilities and Data
import CustomDialog from '@/lib/ui/useable-components/delete-dialog';
import { generateDummyFoods } from '@/lib/utils/dummy';

// Context
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import useToast from '@/lib/hooks/useToast';

// GraphQL
import { DELETE_FOOD } from '@/lib/api/graphql';
<<<<<<< HEAD
import { GET_FOODS_BY_RESTAURANT_ID } from '@/lib/api/graphql/queries';

// Context
import { RestaurantLayoutContext } from '@/lib/context/layout-restaurant.context';
import { FOODS_TABLE_COLUMNS } from '@/lib/ui/useable-components/table/columns/foods-columns';
import { onTransformRetaurantsByIdToFoods } from '@/lib/utils/methods/transformer';
import FoodsTableHeader from '../header/table-header';
=======
import {
  GET_ADDONS_BY_RESTAURANT_ID,
  GET_FOODS_BY_RESTAURANT_ID,
} from '@/lib/api/graphql/queries';

// Methods
import { onTransformRetaurantsByIdToFoods } from '@/lib/utils/methods/transformer';
>>>>>>> fa2f4db90be90a05bfdcf7053b263953a4812c79

export default function FoodsMain() {
  // Context
  const { restaurantLayoutContextData } = useContext(RestaurantLayoutContext);
<<<<<<< HEAD
=======
  const { onSetFoodContextData, onFoodFormVisible } = useContext(FoodsContext);
>>>>>>> fa2f4db90be90a05bfdcf7053b263953a4812c79
  const restaurantId = restaurantLayoutContextData?.restaurantId || '';

  // Hooks
  const { showToast } = useToast();

  // State - Table
  const [foodItems, setFoodItems] = useState<IFoodGridItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
<<<<<<< HEAD
  const [deleteId, setDeleteId] = useState('');
=======
  const [deleteId, setDeleteId] = useState({ id: '', categoryId: '' });
>>>>>>> fa2f4db90be90a05bfdcf7053b263953a4812c79
  const [selectedProducts, setSelectedProducts] = useState<IFoodGridItem[]>([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: '' as string | null, matchMode: FilterMatchMode.CONTAINS },
  });

  // Query
<<<<<<< HEAD
  const { loading } = useQueryGQL(
=======
  const {
    data: foodsData,
    loading,
    refetch,
  } = useQueryGQL(
>>>>>>> fa2f4db90be90a05bfdcf7053b263953a4812c79
    GET_FOODS_BY_RESTAURANT_ID,
    { id: restaurantId },
    {
      fetchPolicy: 'network-only',
      enabled: !!restaurantId,
      onCompleted: onFetchFoodsByRestaurantCompleted,
      onError: onErrorFetchFoodsByRestaurant,
    }
  ) as IQueryResult<IFoodByRestaurantResponse | undefined, undefined>;

<<<<<<< HEAD
=======
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

>>>>>>> fa2f4db90be90a05bfdcf7053b263953a4812c79
  //Mutation
  const [deleteFood, { loading: mutationLoading }] = useMutation(DELETE_FOOD, {
    variables: {
      id: deleteId,
      restaurant: restaurantId,
<<<<<<< HEAD
    },
    refetchQueries: [
      {
        query: GET_FOODS_BY_RESTAURANT_ID,
        variables: { id: restaurantId },
      },
    ],
  });

=======
      categoryId: '',
    },
    onCompleted: () => {
      refetch();
    },
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

>>>>>>> fa2f4db90be90a05bfdcf7053b263953a4812c79
  // Handlers
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  // Restaurant Profile Complete
<<<<<<< HEAD
  function onFetchFoodsByRestaurantCompleted(data: unknown) {
=======
  function onFetchFoodsByRestaurantCompleted() {
    if (!foodsData) return;

>>>>>>> fa2f4db90be90a05bfdcf7053b263953a4812c79
    setIsLoading(true);
    const items = onTransformRetaurantsByIdToFoods(
<<<<<<< HEAD
      data as IFoodByRestaurantResponse
=======
      foodsData ?? ({} as IFoodByRestaurantResponse)
>>>>>>> fa2f4db90be90a05bfdcf7053b263953a4812c79
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
<<<<<<< HEAD
          //setIsAddFoodVisible(true);
          //setFood(data);
=======
          let _variation = null;
          const _variations =
            data?.variations?.map(
              ({ discounted, ...variation }: IVariation) => {
                _variation = { ...variation };
                delete _variation.__typename;

                return {
                  ..._variation,
                  discount: discounted,
                  addons: variation.addons.map((addonId: string) => {
                    return (
                      addons?.find(
                        (addon: IDropdownSelectItem) => addon.code === addonId
                      ) ?? {}
                    );
                  }),
                };
              }
            ) ?? [];

          onSetFoodContextData({
            food: {
              _id: data._id ?? null,
              data: data ?? ({} as IFoodGridItem),
              variations: _variations,
            },
            isEditing: true,
          });
          onFoodFormVisible(true);
>>>>>>> fa2f4db90be90a05bfdcf7053b263953a4812c79
        }
      },
    },
    {
      label: 'Delete',
      command: (data?: IFoodGridItem) => {
        if (data) {
<<<<<<< HEAD
          setDeleteId(data._id ?? '');
=======
          setDeleteId({ id: data._id, categoryId: data?.category?.code ?? '' });
>>>>>>> fa2f4db90be90a05bfdcf7053b263953a4812c79
        }
      },
    },
  ];

<<<<<<< HEAD
=======
  // Use Effect
  useEffect(() => {
    onFetchFoodsByRestaurantCompleted();
  }, [foodsData?.restaurant.categories]);

>>>>>>> fa2f4db90be90a05bfdcf7053b263953a4812c79
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
      <CustomDialog
        loading={mutationLoading}
        visible={!!deleteId}
        onHide={() => {
<<<<<<< HEAD
          setDeleteId('');
=======
          setDeleteId({ id: '', categoryId: '' });
>>>>>>> fa2f4db90be90a05bfdcf7053b263953a4812c79
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
<<<<<<< HEAD
              setDeleteId('');
=======
              setDeleteId({ id: '', categoryId: '' });
>>>>>>> fa2f4db90be90a05bfdcf7053b263953a4812c79
            },
          });
        }}
        message="Are you sure you want to delete this option?"
      />
    </div>
  );
}
