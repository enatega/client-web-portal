'use client';

// Core
import { createContext, useContext, useEffect, useState } from 'react';

// Interface
import {
  IProvider,
  IQueryResult,
  IRestaurantByOwner,
  IRestaurantContextProps,
  IRestaurantsByOwnerResponseGraphQL,
} from '@/lib/utils/interfaces';
import { GET_RESTAURANTS_BY_OWNER } from '../api/graphql';
import { useQueryGQL } from '../hooks/useQueryQL';
import { onFilterObjects } from '../utils/methods';
import { VendorContext } from './vendor.context';

// Types

export const RestaurantContext = createContext<IRestaurantContextProps>(
  {} as IRestaurantContextProps
);

export const RestaurantProvider = ({ children }: IProvider) => {
  // Context
  const { vendorId } = useContext(VendorContext);
  // States
  const [restaurantFormVisible, setRestaurantFormVisible] =
    useState<boolean>(false);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [restaurantFiltered, setRestaurantFiltered] =
    useState<IRestaurantByOwner[]>();
  const [restaurantGlobalFilter, setRestaurantGlobalFilter] =
    useState<string>('');

  // API
  // const restaurantResponse = useQueryGQL(
  //   GET_RESTAURANTS,
  //   {},
  //   {
  //     debounceMs: 300,
  //     onCompleted: (data: unknown) => {
  //       const _data = data as IRestaurantsResponseGraphQL;
  //       setRestaurantId(_data?.restaurants[0]?._id ?? '');
  //     },
  //   }
  // ) as IQueryResult<IRestaurantsResponseGraphQL | undefined, undefined>;

  const restaurantByOwnerResponse = useQueryGQL(
    GET_RESTAURANTS_BY_OWNER,
    {
      id: vendorId,
    },
    {
      enabled: vendorId ? true : false,
      debounceMs: 300,
      onCompleted: (data: unknown) => {
        const _data = data as IRestaurantsByOwnerResponseGraphQL;
        setRestaurantId(_data?.restaurantByOwner?.restaurants[0]?._id ?? '');
      },
    }
  ) as IQueryResult<IRestaurantsByOwnerResponseGraphQL | undefined, undefined>;

  const onSetRestaurantFormVisible = (status: boolean) => {
    setRestaurantFormVisible(status);
  };

  const onSetRestaurantId = (id: string) => {
    setRestaurantId(id);
  };

  const onSetRestaurantGlobalFilter = (filter: string) => {
    setRestaurantGlobalFilter(filter);
  };

  const onHandlerFilterData = () => {
    const _filtered: IRestaurantByOwner[] = onFilterObjects(
      restaurantByOwnerResponse?.data?.restaurantByOwner?.restaurants ?? [],
      restaurantGlobalFilter,
      ['name', 'address', 'shopType']
    );

    setRestaurantFiltered(_filtered);
  };

  // Use Effect
  useEffect(() => {
    onHandlerFilterData();
  }, [restaurantGlobalFilter]);

  useEffect(() => {
    restaurantByOwnerResponse.refetch();
  }, [vendorId]);

  const value: IRestaurantContextProps = {
    restaurantFormVisible,
    onSetRestaurantFormVisible,
    restaurantId,
    onSetRestaurantId,
    // Restaurant Data
    restaurantByOwnerResponse,
    // Filter
    restaurantGlobalFilter,
    onSetRestaurantGlobalFilter,
    restaurantFiltered,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};
