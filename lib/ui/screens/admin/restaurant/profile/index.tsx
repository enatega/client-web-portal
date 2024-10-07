'use client';

<<<<<<< HEAD:lib/ui/screens/admin/restaurant/profile/index.tsx
import ProfileHeader from '@/lib/ui/screen-components/protected/restaurant/profile/restaurant/header/screen-header';

import RestaurantMain from '@/lib/ui/screen-components/protected/restaurant/profile/restaurant/main';
import UpdateRestaurantsProfileForm from '@/lib/ui/screen-components/protected/restaurant/profile/restaurant/add-form';

import { useContext } from 'react';
import { ProfileContext } from '@/lib/context/restaurant/profile.context';
=======
import ProfileHeader from '@/lib/ui/screen-components/protected/profile/restaurant/header/screen-header';

import RestaurantMain from '@/lib/ui/screen-components/protected/profile/restaurant/main';
import UpdateRestaurantsProfileForm from '@/lib/ui/screen-components/protected/profile/restaurant/add-form';

import { useContext } from 'react';
import { ProfileContext } from '@/lib/context/profile.context';
>>>>>>> 6b25c7e89c5a0002f082a391dcbbc51dbd9daaba:lib/ui/screens/admin-vendor/profile/index.tsx
export default function ProfileScreen() {
  const { isUpdateProfileVisible } = useContext(ProfileContext);

  return (
    <div className="screen-container p-4">
      <ProfileHeader />
      <RestaurantMain />

      {isUpdateProfileVisible && <UpdateRestaurantsProfileForm />}
    </div>
  );
}
