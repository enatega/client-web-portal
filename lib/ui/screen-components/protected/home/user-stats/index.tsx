// Components
import StatsCard from '@/lib/ui/useable-components/stats-card';

// Interface & Types

// Dummy Data
import {
  GET_RESTAURANTS_L,
  GET_RIDERS_L,
  GET_USERS_L,
  GET_VENDORS_L,
} from '@/lib/api/graphql';
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import {
  faMotorcycle,
  faStore,
  faUsers,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';

export default function UserStats() {
  const usersCount = useQueryGQL(GET_USERS_L, {
    fetchPolicy: 'network-only',
    debounceMs: 300,
  });
  const vendorsCount = useQueryGQL(GET_VENDORS_L, {
    fetchPolicy: 'network-only',
    debounceMs: 300,
  });
  const restaurantsCount = useQueryGQL(GET_RESTAURANTS_L, {
    fetchPolicy: 'network-only',
    debounceMs: 300,
  });
  const ridersCount = useQueryGQL(GET_RIDERS_L, {
    fetchPolicy: 'network-only',
    debounceMs: 300,
  });

  return (
    <div className="grid items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <StatsCard
        label="Total User"
        total={40987}
        description="8.5% up from yesterday"
        icon={faUsers}
        route="/general/users"
        loading={usersCount?.isLoading}
      />
      <StatsCard
        label="Total Vendors"
        total={7689}
        description="2.4% up from yesterday"
        icon={faStore}
        route="/general/vendors"
        loading={vendorsCount?.isLoading}
      />
      <StatsCard
        label="Total Restaurants"
        total={20689}
        description="6.1% down from yesterday"
        icon={faUtensils}
        route="/general/restaurants"
        loading={restaurantsCount?.isLoading}
      />
      <StatsCard
        label="Total Riders"
        total={12689}
        description="1.9% up from yesterday"
        icon={faMotorcycle}
        route="/general/riders"
        loading={ridersCount?.isLoading}
      />
    </div>
  );
}
