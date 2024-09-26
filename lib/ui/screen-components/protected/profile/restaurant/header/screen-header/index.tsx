import { useContext } from 'react';
import { RestaurantContext } from '@/lib/context/restaurant.context';
import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { IProfileHeaderProps } from '@/lib/utils/interfaces/profile.interface';

const ProfileHeader: React.FC<IProfileHeaderProps> = ({ setIsUpdateProfileVisible }) => {
  const { onSetRestaurantFormVisible } = useContext(RestaurantContext);

  const handleUpdateProfile = () => {
    setIsUpdateProfileVisible(true);
    onSetRestaurantFormVisible(true);
  };

  return (
    <div className="w-full flex-shrink-0">
      <div className="flex w-full justify-between">
        <HeaderText className="heading" text="Profile" />
        <TextIconClickable
          className="sm:w-auto bg-black text-white border-gray-300 rounded"
          icon={faWrench}
          iconStyles={{ color: 'white' }}
          title="Update Profile"
          onClick={handleUpdateProfile}
        />
      </div>
    </div>
  );
};

export default ProfileHeader;