'use client';

// Core
import { createContext, useState } from 'react';

// Interface
import { IProvider, IRestaurantContextProps } from '@/lib/utils/interfaces';

// Types

export const RestaurantContext = createContext<IRestaurantContextProps>(
  {} as IRestaurantContextProps
);

export const RestaurantProvider = ({ children }: IProvider) => {
  const [restaurantFormVisible, setRestaurantFormVisible] =
    useState<boolean>(false);
  const [restaurantId, setRestaurantId] = useState<number | null>(null);

  const onSetRestaurantFormVisible = (status: boolean) => {
    setRestaurantFormVisible(status);
  };

  const onSetRestaurantId = (val: number) => {
    setRestaurantId(val);
  };

  const value: IRestaurantContextProps = {
    restaurantFormVisible,
    onSetRestaurantFormVisible,
    restaurantId,
    onSetRestaurantId,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};
