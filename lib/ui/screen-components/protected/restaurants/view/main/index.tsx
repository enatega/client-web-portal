// Core
import { useState } from 'react';

// PrimeReact
import { FilterMatchMode } from 'primereact/api';

// Apollo Client

// Custom Hooks
import { useQueryGQL } from '@/lib/hooks/useQueryQL';

// Custom Components
import Table from '@/lib/ui/useable-components/table';

// Constants and Interfaces
import { RESTAURANT_TABLE_COLUMNS } from '@/lib/utils/constants';
import {
  IQueryResult,
  IRestaurantResponse,
  IRestaurantsResponseGraphQL,
} from '@/lib/utils/interfaces';

// GraphQL Queries and Mutations
import { GET_RESTAURANTS } from '@/lib/api/graphql';
import { generateDummyRestaurants } from '@/lib/utils/dummy';
import RestaurantsTableHeader from '../header/table-header';

export default function RestaurantsMain() {
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

  return (
    <div className="pt-5">
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
        columns={RESTAURANT_TABLE_COLUMNS()}
        loading={loading}
      />
    </div>
  );
}
