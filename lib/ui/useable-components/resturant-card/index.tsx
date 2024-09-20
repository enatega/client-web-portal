// Core
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

// Interface
import { IRestaurantCardProps } from '@/lib/utils/interfaces';

// Methods
import { onUseLocalStorage } from '@/lib/utils/methods';

// Icons
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

// Componetn
import { DELETE_RESTAURANT } from '@/lib/api/graphql';
import { ToastContext } from '@/lib/context/toast.context';
import { useMutation } from '@apollo/client';
import Image from 'next/image';
import CustomButton from '../button';
import CustomLoader from '../custom-progress-indicator';
import TextComponent from '../text-field';

export default function RestaurantCard({ restaurant }: IRestaurantCardProps) {
  // Props
  const { _id, name, image, address, shopType, isActive } = restaurant;

  // Hooks
  const { showToast } = useContext(ToastContext);

  // Hooks
  const router = useRouter();

  // API
  const [deleteRestaurant, { loading }] = useMutation(DELETE_RESTAURANT, {});

  // Handle checkbox change
  const handleCheckboxChange = async () => {
    try {
      await deleteRestaurant({ variables: { id: _id } });

      showToast({
        type: 'success',
        title: 'Restaurant Status',
        message: `Restaurant has been marked a ${isActive ? 'in-active' : 'actie'}`,
        duration: 2000,
      });
    } catch (err) {
      showToast({
        type: 'success',
        title: 'Restaurant Status',
        message: `Restaurant marked as ${isActive ? 'in-active' : 'actie'} failed`,
        duration: 2000,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border-2 border-[#F4F4F5] flex flex-col">
      <div className="flex items-center mb-4 rounded-t-lg bg-gray-200 p-4">
        <Image
          src={image}
          alt="Restaurant logo"
          className="rounded-full mr-3 w-10 h-10 flex-shrink-0"
          width={40}
          height={40}
        />
        <div className="flex-grow min-w-0">
          <TextComponent className={`card-h2 truncate`} text={name} />

          <TextComponent
            className={`card-h3 text-gray-500  truncate`}
            text={shopType}
          />
        </div>
        {loading ? (
          <CustomLoader />
        ) : (
          <label className="ml-2 flex items-center cursor-pointer flex-shrink-0">
            <div className="relative">
              <div className="flex items-center space-x-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked={isActive}
                    onChange={handleCheckboxChange}
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-primary-color"></div>
                  <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-5"></div>
                </label>
              </div>
            </div>
          </label>
        )}
      </div>
      <div className="flex items-center gap-x-2 text-sm text-gray-500 mb-4 px-4 truncate">
        <FontAwesomeIcon icon={faLocationDot} />

        <TextComponent
          className={`card-h2 text-gray-500  truncate`}
          text={address}
        />
      </div>
      <div className="px-4 mb-2">
        <CustomButton
          className="w-full h-10 bg-[#EBEDE6] text-black "
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
