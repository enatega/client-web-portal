'use client';
import RestaurantsForm from '@/lib/ui/screen-components/protected/restaurants/add-form';
import RestaurantsScreenHeader from '@/lib/ui/screen-components/protected/restaurants/view/header/screen-header';
import RestaurantsMain from '@/lib/ui/screen-components/protected/restaurants/view/main';
import { IRestaurantResponse } from '@/lib/utils/interfaces';
import { useState } from 'react';

export default function RestaurantsScreen() {
  // Hooks
  const [isAddRestaurantVisible, setIsAddRestaurantVisible] = useState(false);
  const [restaurant, setRestaurant] = useState<null | IRestaurantResponse>(
    null
  );

  return (
    <div className="flex flex-col h-screen p-3">
      <RestaurantsScreenHeader />
      <RestaurantsMain
        setIsAddRestaurantVisible={setIsAddRestaurantVisible}
        setRestaurant={setRestaurant}
      />
      <RestaurantsForm
        isAddRestaurantVisible={isAddRestaurantVisible}
        onHide={() => setIsAddRestaurantVisible(false)}
        restaurant={restaurant}
      />
    </div>
  );
}
