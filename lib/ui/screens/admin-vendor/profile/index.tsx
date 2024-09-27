'use client';


import ProfileHeader from '@/lib/ui/screen-components/protected/profile/restaurant/header/screen-header';

import RestaurantMain from '@/lib/ui/screen-components/protected/profile/restaurant/main';


export default function ProfileScreen() {



  return (
    <div className="flex flex-col p-3 h-screen">
      <div className="flex-grow overflow-y-auto">
        <ProfileHeader />
        <RestaurantMain />
        
      </div>
      {/* {isUpdateProfileVisible && <UpdateRestaurantsProfileForm />} */}
    </div>
  );
}
