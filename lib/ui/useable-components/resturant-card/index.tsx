// Core
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

// Interface
import { IRestaurantCardProps } from '@/lib/utils/interfaces';

// Methods
import { onUseLocalStorage } from '@/lib/utils/methods';

// Icons
import { faLocationDot, faStore } from '@fortawesome/free-solid-svg-icons';

// Componetn
import { DELETE_RESTAURANT } from '@/lib/api/graphql';
import { ToastContext } from '@/lib/context/toast.context';
import { ApolloError, useMutation } from '@apollo/client';
import Image from 'next/image';
import { Avatar } from 'primereact/avatar';
import CustomButton from '../button';
import CustomInputSwitch from '../custom-input-switch';
import TextComponent from '../text-field';

export default function RestaurantCard({ restaurant }: IRestaurantCardProps) {
  // Props
  const { _id, name, image, address, shopType, isActive } = restaurant;

  // Hooks
  const { showToast } = useContext(ToastContext);

  // Hooks
  const router = useRouter();

  // API
  const [deleteRestaurant, { loading }] = useMutation(DELETE_RESTAURANT, {
    onCompleted: () => {
      showToast({
        type: 'success',
        title: 'Restaurant Status',
        message: `Restaurant has been marked a ${isActive ? 'in-active' : 'actie'}`,
        duration: 2000,
      });
    },
    onError: ({ networkError, graphQLErrors }: ApolloError) => {
      showToast({
        type: 'error',
        title: 'Restaurant Status (Un-changed)',
        message:
          graphQLErrors[0]?.message ??
          networkError?.message ??
          `Restaurant marked as ${isActive ? 'in-active' : 'actie'} failed`,
        duration: 2500,
      });
    },
  });

  // Handle checkbox change
  const handleCheckboxChange = async () => {
    try {
      await deleteRestaurant({ variables: { id: _id } });
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Restaurant Status',
        message: `Restaurant marked as ${isActive ? 'in-active' : 'actie'} failed`,
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex flex-col rounded-lg border-2 border-[#F4F4F5] bg-white shadow-md">
      <div className="mb-4 flex items-center rounded-t-lg bg-gray-200 p-4">
        {image ? (
          <Image
            src={image}
            alt="Restaurant logo"
            className="mr-3 h-10 w-10 flex-shrink-0 rounded-full"
            width={40}
            height={40}
          />
        ) : (
          <Avatar
            icon={<FontAwesomeIcon icon={faStore} />}
            className="mr-3"
            size="large"
            shape="circle"
          />
        )}
        <div className="min-w-0 flex-grow">
          <TextComponent className={`card-h2 truncate`} text={name} />

          <TextComponent
            className={`card-h3 truncate text-gray-500`}
            text={shopType}
          />
        </div>
        <CustomInputSwitch
          loading={loading}
          isActive={isActive}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="mb-4 flex items-center gap-x-2 truncate px-4 text-sm text-gray-500">
        <FontAwesomeIcon icon={faLocationDot} />

        <TextComponent
          className={`card-h2 truncate text-gray-500`}
          text={address}
        />
      </div>
      <div className="mb-2 px-4">
        <CustomButton
          className="h-10 w-full bg-[#EBEDE6] text-black"
          label="View Details"
          onClick={() => {
            onUseLocalStorage('save', 'restaurantId', _id);
            router.push(`/admin/restaurant/`);
          }}
        />
      </div>
    </div>
  );
}
