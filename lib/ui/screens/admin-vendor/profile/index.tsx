'use client';

import ProfileHeader from '@/lib/ui/screen-components/protected/profile/restaurant/header/screen-header';

import RestaurantMain from '@/lib/ui/screen-components/protected/profile/restaurant/main';

export default function ProfileScreen() {
  return (
    <div className="flex h-screen flex-col p-3">
      <ProfileHeader />
      <RestaurantMain />
      {/* {isUpdateProfileVisible && <UpdateRestaurantsProfileForm />} */}
    </div>
  );
}
