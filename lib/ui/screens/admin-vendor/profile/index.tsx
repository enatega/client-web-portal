import { useState } from 'react';
import ProfileHeader from '@/lib/ui/screen-components/protected/profile/restaurant/header/screen-header';
import UpdateRestaurantsProfileForm from '@/lib/ui/screen-components/protected/profile/restaurant/add-form';
import { RestaurantProvider } from '@/lib/context/restaurant.context';
import RestaurantMain from '@/lib/ui/screen-components/protected/profile/restaurant/main';
import { GET_RESTAURANT_PROFILE } from '@/lib/api/graphql';

export default function ProfileScreen() {
  const [isUpdateProfileVisible, setIsUpdateProfileVisible] = useState(false);

  return (
    <RestaurantProvider>
      <div className="flex flex-col p-3 h-screen overflow-hidden">
        <div className="flex-grow overflow-y-auto">
          <ProfileHeader
            setIsUpdateProfileVisible={setIsUpdateProfileVisible}
          />

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
        </div>
        <UpdateRestaurantsProfileForm />
      </div>
    </RestaurantProvider>
  );
}
