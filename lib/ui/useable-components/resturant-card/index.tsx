import { IRestaurantCardProps } from '@/lib/utils/interfaces';

export default function RestaurantCard({ index }: IRestaurantCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border-2 border-[#F4F4F5]">
      <div className="flex items-center mb-4 rounded-t-lg bg-gray-200 p-4">
        <img
          src={`https://placehold.co/40x40?text=${index % 3 === 0 ? 'KFC' : index % 3 === 1 ? 'McD' : 'BK'}`}
          alt="Restaurant logo"
          className="rounded-full mr-3"
        />
        <div className="flex-1">
          <div className="font-bold">
            {index % 3 === 0
              ? 'KFC'
              : index % 3 === 1
                ? 'Mcdonalds'
                : 'Buger King'}
          </div>
          <div className="text-sm text-gray-500">
            {index % 3 === 0
              ? 'kfc@example.com'
              : index % 3 === 1
                ? 'mcdonald@example.com'
                : 'burgerking@example.com'}
          </div>
        </div>
        <label className="ml-auto flex items-center cursor-pointer">
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
      <div className="text-sm text-gray-500 mb-4 px-4">
        <i className="fas fa-map-marker-alt"></i>
        Name Address 13th Street 47 W 13th St, New York
      </div>
      <div className="px-4">
        <button className="bg-[#EBEDE6] text-black px-4 py-2 rounded-lg w-full mb-4">
          View details
        </button>
      </div>
    </div>
  );
}
