'use client';

// Core
import { createContext, useState } from 'react';

// Interface
import {
  IProvider,
  RestaurantLayoutContextData,
  RestaurantLayoutContextProps,
} from '@/lib/utils/interfaces';

// Types

export const RestaurantLayoutContext =
  createContext<RestaurantLayoutContextProps>(
    {} as RestaurantLayoutContextProps
  );

export const RestaurantLayoutProvider = ({ children }: IProvider) => {
  const [restaurantLayoutContextData, setRestaurantLayoutContextData] =
    useState<RestaurantLayoutContextData>({} as RestaurantLayoutContextData);

  // Handlers

  const onSetRestaurantLayoutContextData = (
    data: Partial<RestaurantLayoutContextData>
  ) => {
    setRestaurantLayoutContextData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const value: RestaurantLayoutContextProps = {
    restaurantLayoutContextData,
    onSetRestaurantLayoutContextData,
  };

  return (
    <RestaurantLayoutContext.Provider value={value}>
      {children}
    </RestaurantLayoutContext.Provider>
  );
};
