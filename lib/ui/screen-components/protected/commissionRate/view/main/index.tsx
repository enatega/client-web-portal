import { GET_RESTAURANTS, updateCommission } from '@/lib/api/graphql';
import { ToastContext } from '@/lib/context/toast.context';
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import Table from '@/lib/ui/useable-components/table';
import { COMMISSION_RATE_COLUMNS } from '@/lib/utils/constants';
import { generateDummyCommissionRates } from '@/lib/utils/dummy';
import { IQueryResult, IRestaurantResponse } from '@/lib/utils/interfaces';
import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import CommissionRateHeader from '../header';

interface RestaurantsData {
  restaurants: IRestaurantResponse[];
}

export default function CommissionRateMain() {
  const [restaurants, setRestaurants] = useState<IRestaurantResponse[]>([]);
  const [editingRestaurantIds, setEditingRestaurantIds] = useState<Set<string>>(
    new Set()
  );
  const [selectedRestaurants, setSelectedRestaurants] = useState<
    IRestaurantResponse[]
  >([]);
  const [loadingRestaurant, setLoadingRestaurant] = useState<string | null>(
    null
  );
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { showToast } = useContext(ToastContext);
  const { data, error, refetch, loading } = useQueryGQL(GET_RESTAURANTS, {
    fetchPolicy: 'network-only',
  }) as IQueryResult<RestaurantsData | undefined, undefined>;

  const [updateCommissionMutation] = useMutation(updateCommission);

  useEffect(() => {
    if (data?.restaurants) {
      setRestaurants(data.restaurants);
    } else if (error) {
      console.error('Error fetching restaurants:', error);
    }
  }, [data, error]);

  const handleSave = async (restaurantId: string) => {
    const restaurant = restaurants.find((r) => r._id === restaurantId);
    if (restaurant) {
      setLoadingRestaurant(restaurantId);
      try {
        await updateCommissionMutation({
          variables: {
            id: restaurantId,
            commissionRate: parseFloat(restaurant.commissionRate.toString()),
          },
        });
        showToast({
          type: 'success',
          title: 'Commission Updated',
          message: `Commission rate updated for ${restaurant.name}`,
          duration: 2000,
        });
        setEditingRestaurantIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(restaurantId);
          return newSet;
        });
        refetch();
      } catch (error) {
        showToast({
          type: 'error',
          title: 'Error',
          message: `Error updating commission rate for ${restaurant.name}`,
          duration: 2000,
        });
        console.error('Error updating commission rate:', error);
      } finally {
        setLoadingRestaurant(null);
      }
    }
  };

  const handleCommissionRateChange = (restaurantId: string, value: number) => {
    setRestaurants((prevRestaurants) =>
      prevRestaurants.map((restaurant) =>
        restaurant._id === restaurantId
          ? { ...restaurant, commissionRate: value }
          : restaurant
      )
    );
    setEditingRestaurantIds((prev) => new Set(prev).add(restaurantId));
  };

  const getFilteredRestaurants = () => {
    return restaurants.filter((restaurant) => {
      const nameMatches = restaurant.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Always show restaurants that are currently being edited
      if (editingRestaurantIds.has(restaurant._id)) {
        return true;
      }

      // Apply name filter
      if (!nameMatches) {
        return false;
      }

      // If no commission rate filters are applied, show all name matches
      if (selectedActions.length === 0) {
        return true;
      }

      // Apply commission rate filters
      return selectedActions.some((action) => {
        switch (action) {
          case 'More than 5%':
            return restaurant.commissionRate > 5;
          case 'More than 10%':
            return restaurant.commissionRate > 10;
          case 'More than 20%':
            return restaurant.commissionRate > 20;
          default:
            return false;
        }
      });
    });
  };

  const filteredRestaurants = getFilteredRestaurants();

  const columns = COMMISSION_RATE_COLUMNS({
    handleSave,
    handleCommissionRateChange,
    loadingRestaurant,
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="p-2 pt-5 pb-20">
      <>
        <CommissionRateHeader
          setSelectedActions={setSelectedActions}
          selectedActions={selectedActions}
          onSearch={handleSearch}
        />
        <Table
          data={loading ? generateDummyCommissionRates() : filteredRestaurants}
          setSelectedData={setSelectedRestaurants}
          selectedData={selectedRestaurants}
          columns={columns}
          loading={loading}
        />
      </>
    </div>
  );
}
