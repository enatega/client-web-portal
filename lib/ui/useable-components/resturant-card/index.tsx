import { IRestaurantCardProps } from '@/lib/utils/interfaces';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CustomButton from '../button';
import TextComponent from '../text-field';

export default function RestaurantCard({ index }: IRestaurantCardProps) {
  // States
  const [isChecked, setIsChecked] = useState(false);

  // Hooks
  const router = useRouter();

  // Handle checkbox change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the state
  };

  return (
    <div className="bg-white rounded-lg shadow-md border-2 border-[#F4F4F5] flex flex-col">
      <div className="flex items-center mb-4 rounded-t-lg bg-gray-200 p-4">
        <img
          src={`https://placehold.co/40x40?text=${index % 3 === 0 ? 'KFC' : index % 3 === 1 ? 'McD' : 'BK'}`}
          alt="Restaurant logo"
          className="rounded-full mr-3 w-10 h-10 flex-shrink-0"
        />
        <div className="flex-grow min-w-0">
          <TextComponent className={`card-h1 truncate`} text="Mcdonalds" />

          <TextComponent
            className={`card-h2 text-gray-500  truncate`}
            text="mcdonald@example.com"
          />
        </div>
        <label className="ml-2 flex items-center cursor-pointer flex-shrink-0">
          <div className="relative">
            <div className="flex items-center space-x-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-primary-color"></div>
                <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-5"></div>
              </label>
            </div>
          </div>
        </label>
      </div>
      <div className="flex items-center gap-x-2 text-sm text-gray-500 mb-4 px-4 truncate">
        <FontAwesomeIcon icon={faLocationDot} />

        <TextComponent
          className={`card-h2 text-gray-500  truncate`}
          text="Name Address 13th Street 47 W 13th St, New York"
        />
      </div>
      <div className="px-4 mb-2">
        <CustomButton
          className="w-full h-10 bg-[#EBEDE6] text-black "
          label="View Details"
          onClick={() => router.push(`/admin/restaurant/`)}
        />
      </div>
    </div>
  );
}
