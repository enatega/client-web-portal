// Components
import StatsCard from '@/lib/ui/useable-components/stats-card';

// GraphQL Queries
import {
  GET_RESTAURANTS_L,
  GET_RIDERS_L,
  GET_USERS_L,
  GET_VENDORS_L,
} from '@/lib/api/graphql';

// Hooks
import { useQueryGQL } from '@/lib/hooks/useQueryQL';

// Icons
import {
  IQueryResult,
  IRestaurantsResponseGraphQL,
  IUsersResponseGraphQL,
  IVendorResponseGraphQL,
} from '@/lib/utils/interfaces';
import { IRidersResponseGraphQL } from '@/lib/utils/interfaces/rider.interface';
import {
  faMotorcycle,
  faStore,
  faUsers,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';

export default function UserStats() {
  const usersCount = useQueryGQL(GET_USERS_L, {
    debounceMs: 300,
  }) as IQueryResult<IUsersResponseGraphQL | undefined, undefined>;
  const vendorsCount = useQueryGQL(GET_VENDORS_L, {
    debounceMs: 300,
  }) as IQueryResult<IVendorResponseGraphQL | undefined, undefined>;
  const restaurantsCount = useQueryGQL(GET_RESTAURANTS_L, {
    debounceMs: 300,
  }) as IQueryResult<IRestaurantsResponseGraphQL | undefined, undefined>;
  const ridersCount = useQueryGQL(GET_RIDERS_L, {
    debounceMs: 300,
  }) as IQueryResult<IRidersResponseGraphQL | undefined, undefined>;

  return (
    <div className="grid items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <StatsCard
        label="Total User"
        total={usersCount?.data?.users?.length ?? 0}
        description="8.5% up from yesterday"
        icon={faUsers}
        route="/general/users"
        loading={usersCount?.loading}
      />
      <StatsCard
        label="Total Vendors"
        total={vendorsCount.data?.vendors?.length ?? 0}
        description="2.4% up from yesterday"
        icon={faStore}
        route="/general/vendors"
        loading={vendorsCount?.loading}
      />
      <StatsCard
        label="Total Restaurants"
        total={restaurantsCount?.data?.restaurants?.length ?? 0}
        description="6.1% down from yesterday"
        icon={faUtensils}
        route="/general/restaurants"
        loading={restaurantsCount?.loading}
      />
      <StatsCard
        label="Total Riders"
        total={ridersCount?.data?.riders?.length ?? 0}
        description="1.9% up from yesterday"
        icon={faMotorcycle}
        route="/general/riders"
        loading={ridersCount?.loading}
      />
    </div>
  );
}
