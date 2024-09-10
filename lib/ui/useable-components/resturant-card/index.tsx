import { IRestaurantCardProps } from '@/lib/utils/interfaces';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextComponent from '../text-field';

export default function RestaurantCard({ index }: IRestaurantCardProps) {
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
            <input
              type="checkbox"
              className="sr-only"
              defaultChecked={index % 3 === 0}
            />
            <div className="block bg-gray-200 w-10 h-6 rounded-full"></div>
            <div
              className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${index % 3 === 0 ? 'transform translate-x-full bg-green-500' : ''}`}
            ></div>
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
      <div className="px-4 mt-auto">
        <button className="bg-[#EBEDE6] text-black px-4 py-2 rounded-lg w-full mb-4">
          View details
        </button>
      </div>
    </div>
  );
}
