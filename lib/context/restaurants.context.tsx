'use client';

// Core
import { createContext, useState } from 'react';

// Interface
import {
  IRestaurantsContextProps,
  IRestaurantsProvider,
  IRestaurantsSelectedVendor,
} from '@/lib/utils/interfaces';

// Types

export const RestaurantsContext = createContext({} as IRestaurantsContextProps);

export const RestaurantsProvider = ({ children }: IRestaurantsProvider) => {
  // Form Visibility
  const [isRestaurantsFormVisible, setRestaurantsFormVisible] =
    useState<boolean>(false);

  const [restaurantsVendor, setRestaurantsVendor] =
    useState<IRestaurantsSelectedVendor>();

  // Form Flow
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Functions
  const onRestaurantsFormVisible = (status: boolean) => {
    setRestaurantsFormVisible(status);
  };

  const onActiveStepChange = (activeStep: number) => {
    setActiveIndex(activeStep);
  };

  const onClearRestaurntsData = () => {
    setActiveIndex(0);
  };

  // Vendor
  const onSetRestaurantsVendor = (
    vendor: IRestaurantsSelectedVendor | undefined
  ) => {
    setRestaurantsVendor(vendor);
  };

  const value: IRestaurantsContextProps = {
    // Form Visibility
    isRestaurantsFormVisible,
    onRestaurantsFormVisible,
    // Active Step
    activeIndex,
    onActiveStepChange,
    // Clear
    onClearRestaurntsData,
    // Vendor
    restaurantsVendor,
    onSetRestaurantsVendor,
  };

  return (
    <RestaurantsContext.Provider value={value}>
      {children}
    </RestaurantsContext.Provider>
  );
};
