'use client';


import ProfileHeader from '@/lib/ui/screen-components/protected/profile/restaurant/header/screen-header';

import RestaurantMain from '@/lib/ui/screen-components/protected/profile/restaurant/main';
import UpdateRestaurantsProfileForm from '@/lib/ui/screen-components/protected/profile/restaurant/add-form';

import { useContext } from 'react';
import { ProfileContext } from '@/lib/context/profile.context';
export default function ProfileScreen() {

  const { isUpdateProfileVisible } =
  useContext(ProfileContext);

  return (
    <div className="flex flex-col p-3 h-screen">
      <div className="flex-grow overflow-y-auto">
        <ProfileHeader />
        <RestaurantMain />
        
      </div>
      {isUpdateProfileVisible && <UpdateRestaurantsProfileForm />}
      
    </div>
  );
}

