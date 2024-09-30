// components/ProfileHeader.tsx
import React, { useContext } from 'react';

import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { ProfileContext } from '@/lib/context/profile.context';

const ProfileHeader: React.FC = () => {
  const profileContext = useContext(ProfileContext);

  const onUpdateProfileClick = () => {
    console.log('Update Profile button clicked');
    profileContext?.handleUpdateProfile();
  };

  return (
    <div className="sticky top-0 z-10 w-full flex-shrink-0 bg-white p-3 shadow-sm">
      <div className="flex w-full justify-between">
        <HeaderText className="heading" text="Profile" />
        <TextIconClickable
          className="rounded border-gray-300 bg-black text-white sm:w-auto"
          icon={faWrench}
          iconStyles={{ color: 'white' }}
          title="Update Profile"
          onClick={onUpdateProfileClick}
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
