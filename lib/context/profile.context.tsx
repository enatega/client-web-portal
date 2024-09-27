'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { GET_RESTAURANT_PROFILE } from '@/lib/api/graphql';
import { RestaurantLayoutContext } from '@/lib/context/layout-restaurant.context';
import { useQueryGQL } from '../hooks/useQueryQL';
import { IQueryResult, IProfileContextData, IProfileProviderProps } from '../utils/interfaces';
import { IRestaurantProfileProps } from '../utils/interfaces';

export const ProfileContext = createContext<IProfileContextData>({} as IProfileContextData);

// export const useProfileContext = () => {
//   const context = useContext(ProfileContext);
//   if (context === undefined) {
//     throw new Error('useProfileContext must be used within a ProfileProvider');
//   }
//   return context;
// };

export const ProfileProvider: React.FC<IProfileProviderProps> = ({ children }) => {
  const { restaurantLayoutContextData } = useContext(RestaurantLayoutContext);
  const { restaurantId } = restaurantLayoutContextData;

  const [isUpdateProfileVisible, setIsUpdateProfileVisible] = useState(false);

  const restaurantProfileResponse = useQueryGQL(
    GET_RESTAURANT_PROFILE,
    {
      id: restaurantId,
    },
    {
      enabled: !!restaurantId,
      fetchPolicy:"network-only",
      debounceMs: 300,
      onCompleted: (data: unknown) => {
        console.log("Profile data fetched:", data);
        // You can perform any actions with the fetched data here
      },
    }
  ) as IQueryResult<IRestaurantProfileProps | undefined, undefined>;

  const handleUpdateProfile = () => {
    setIsUpdateProfileVisible(true);
  };

  useEffect(() => {
    if (restaurantId) {
      restaurantProfileResponse.refetch();
    }
  }, [restaurantId]);

  const value: IProfileContextData = {
    isUpdateProfileVisible,
    setIsUpdateProfileVisible,
    handleUpdateProfile,
    restaurantProfileResponse,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};