import React, { useContext } from 'react';
import { ProfileLogoSVG } from '@/lib/utils/assets/svgs/profile';
import { IInfoItemProps } from '@/lib/utils/interfaces/profile/restaurant.profile.interface';
import { Avatar } from 'primereact/avatar';
import { ProfileContext } from '@/lib/context/profile.context';
import RestaurantProfileSkeleton from '@/lib/ui/useable-components/custom-skeletons/restaurant.profile.skeleton';
import Image from 'next/image';

const InfoItem: React.FC<IInfoItemProps> = ({ label, value }) => (
  <div>
    <p className="mb-2 text-xs text-gray-500">{label}</p>
    <p className="font-medium">{value || 'N/A'}</p>
  </div>
);

const RestaurantMain: React.FC = () => {
  // Context
  const { restaurantProfileResponse } = useContext(ProfileContext);
  const restaurant = restaurantProfileResponse?.data?.restaurant;

  if (restaurantProfileResponse.loading) return <RestaurantProfileSkeleton />;

  return (
    <div className="mt-8 flex items-center justify-center">
      <div className="w-full rounded border-2 border-dotted border-inherit bg-white p-8">
        <div className="mb-6 flex items-center">
          <ProfileLogoSVG width="55" height="55" strokeColor="#1E1E1E" />
          <div className="ml-2">
            <h1 className="text-xs text-gray-500">Restaurant Name</h1>
            <h2 className="text-2xl font-bold">{restaurant?.name || 'N/A'}</h2>
          </div>
        </div>
        <hr className="mb-6" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <InfoItem label="User Name" value={restaurant?.username} />
          <InfoItem label="Password" value={restaurant?.password} />
          <div className="md:row-span-4">
            <p className="mb-4 text-xs text-gray-500">Images</p>
            <div className="flex space-x-2">
              {restaurant?.image ? (
                <Image
                  src={restaurant?.image}
                  alt="i-portrait.png"
                  className="rounded object-cover"
                  width={96}
                  height={96}
                />
              ) : (
                <Avatar label="Image" className="h-24 w-24" />
              )}
              {restaurant?.logo && !restaurant?.logo.includes('/static') ? (
                <Image
                  src={restaurant?.logo}
                  alt="l-portrait.png"
                  className="rounded object-cover"
                  width={96}
                  height={96}
                />
              ) : (
                <Avatar label="Logo" className="h-24 w-24" />
              )}
            </div>
          </div>
          <InfoItem label="Name" value={restaurant?.name} />
          <InfoItem label="Address" value={restaurant?.address} />
          <InfoItem
            label="Delivery Time"
            value={restaurant?.deliveryTime?.toString()}
          />
          <InfoItem
            label="Min Order"
            value={restaurant?.minimumOrder?.toString()}
          />
          <InfoItem label="Sales Tax" value={restaurant?.tax?.toString()} />
          <InfoItem label="Order Prefix" value={restaurant?.orderPrefix} />
          <InfoItem label="Shop Category" value={restaurant?.shopType} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantMain;
