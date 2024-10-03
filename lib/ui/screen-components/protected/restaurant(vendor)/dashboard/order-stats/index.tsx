// Component
import { GET_DASHBOARD_RESTAURANT_ORDERS } from '@/lib/api/graphql/queries/dashboard';
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import { IDashboardRestaurantOrdersSalesStatsResponseGraphQL, IQueryResult } from '@/lib/utils/interfaces';
import StatsCard from '@/lib/ui/useable-components/stats-card';


// Interface & Types
import { faCashRegister, faCreditCard, faMoneyBillWave, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useContext, useMemo } from 'react';
import { RestaurantLayoutContext } from '@/lib/context/layout-restaurant.context';

export default function UserStats() {


  // Context
  const { restaurantLayoutContextData: { restaurantId } } = useContext(RestaurantLayoutContext);


  const { data, loading } = useQueryGQL(GET_DASHBOARD_RESTAURANT_ORDERS, {
    restaurant: restaurantId
  }, {
    fetchPolicy: "network-only",
    debounceMs: 300,
  }) as IQueryResult<IDashboardRestaurantOrdersSalesStatsResponseGraphQL | undefined, undefined>;

  const dashboardUsers = useMemo(() => {
    if (!data) return null;
    return {
      totalOrders: data?.getRestaurantDashboardOrdersSalesStats?.totalOrders ?? 0,
      totalSales: data?.getRestaurantDashboardOrdersSalesStats?.totalSales ?? 0,
      totalCODOrders: data?.getRestaurantDashboardOrdersSalesStats?.totalCODOrders ?? 0,
      totalCardOrders: data?.getRestaurantDashboardOrdersSalesStats?.totalCardOrders ?? 0,
    };
  }, [data]);

  return (
    <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {/* {dummyOrderStatsData.map(renderStatsCard)} */}

      <StatsCard
        label="Total Orders"
        total={dashboardUsers?.totalOrders ?? 0}
        icon={faShoppingCart}
        route="/food-management/orders"
        loading={loading}
        amountConfig={{ format: 'number', currency: 'USD' }}
      />


      <StatsCard
        label="Total COD Orders"
        total={dashboardUsers?.totalCODOrders ?? 0}
        icon={faMoneyBillWave}
        route="/food-management/orders"
        loading={loading}
        amountConfig={{ format: 'number', currency: 'USD' }}
      />

      <StatsCard
        label="Total Card Orders"
        total={dashboardUsers?.totalCardOrders ?? 0}
        icon={faCreditCard}
        route="/food-management/orders"
        loading={loading}
        amountConfig={{ format: 'number', currency: 'USD' }}
      />

      <StatsCard
        label="Total Sales"
        total={dashboardUsers?.totalSales ?? 0}
        icon={faCashRegister}
        route="/food-management/orders"
        loading={loading}
        amountConfig={{ format: 'currency', currency: 'USD' }}
      />

    </div>
  );
}
