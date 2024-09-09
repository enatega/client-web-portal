import { IRestaurantCardProps } from '@/lib/utils/interfaces';

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
          <div className="font-bold truncate">
            {index % 3 === 0
              ? 'KFC'
              : index % 3 === 1
                ? 'Mcdonalds'
                : 'Burger King'}
          </div>
          <div className="text-sm text-gray-500 truncate">
            {index % 3 === 0
              ? 'kfc@example.com'
              : index % 3 === 1
                ? 'mcdonald@example.com'
                : 'burgerking@example.com'}
          </div>
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
      <div className="text-sm text-gray-500 mb-4 px-4 truncate">
        <i className="fas fa-map-marker-alt mr-1"></i>
        Name Address 13th Street 47 W 13th St, New York
      </div>
      <div className="px-4 mt-auto">
        <button className="bg-[#EBEDE6] text-black px-4 py-2 rounded-lg w-full mb-4">
          View details
        </button>
      </div>
    </div>
  );
}
