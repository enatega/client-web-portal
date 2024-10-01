'use client';

// Core
import { createContext, useState } from 'react';

// Interface
import {
  IRestaurantsContextPropData,
  IRestaurantsContextProps,
  IRestaurantsProvider,
} from '@/lib/utils/interfaces';

// Types

export const RestaurantsContext = createContext({} as IRestaurantsContextProps);

export const RestaurantsProvider = ({ children }: IRestaurantsProvider) => {
  // Form Visibility
  const [isRestaurantsFormVisible, setRestaurantsFormVisible] =
    useState<boolean>(false);

  const [restaurantsContextData, setRestaurantsContextData] =
    useState<IRestaurantsContextPropData | null>({
      restaurant: {
        _id: null,
      },
      vendor: {
        _id: null,
      },
      isEditing: false,
    });

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
  const onSetRestaurantsContextData = (vendor: IRestaurantsContextPropData) => {
    setRestaurantsContextData(vendor);
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
    // Context Data
    restaurantsContextData,
    onSetRestaurantsContextData,
  };

  return (
    <RestaurantsContext.Provider value={value}>
      {children}
    </RestaurantsContext.Provider>
  );
};
