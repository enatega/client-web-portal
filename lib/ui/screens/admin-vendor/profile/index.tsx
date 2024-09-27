import { useState } from 'react';
import ProfileHeader from '@/lib/ui/screen-components/protected/profile/restaurant/header/screen-header';
import UpdateRestaurantsProfileForm from '@/lib/ui/screen-components/protected/profile/restaurant/add-form';
import { RestaurantProvider } from '@/lib/context/restaurant.context';
import RestaurantMain from '@/lib/ui/screen-components/protected/profile/restaurant/main';

export default function ProfileScreen() {
  const [, setIsUpdateProfileVisible] = useState(false);

  return (
    <RestaurantProvider>
      <div className="screen-container">
        <ProfileHeader setIsUpdateProfileVisible={setIsUpdateProfileVisible} />

        <RestaurantMain
          restaurantName="African Grocer"
          userName="AfricanOasisGrocer"
          password="AfricanOasisGrocer"
          name="African Oasis Grocer"
          address="Africa"
          deliveryTime={20}
          minOrder={0}
          salesTax={10}
          orderPrefix="C32LM"
          shopCategory="Grocery"
          cuisines="Chinese, Korean"
        />
        <UpdateRestaurantsProfileForm />
      </div>
    </RestaurantProvider>
  );
}
