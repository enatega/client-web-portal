'use client';

import CustomTab from '@/lib/ui/useable-components/custom-tab';
import RestaurantCard from '@/lib/ui/useable-components/resturant-card';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import VendorCard from '@/lib/ui/useable-components/vendor-card';
import { options } from '@/lib/utils/constants';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function VendorsScreen() {
  //
  const [selectedVendorFilter, setSelectedVendorFilter] = useState<string>(
    options[1]
  );
  const [selectedRestaurantFilter, setSelectedResturantFilter] =
    useState<string>(options[1]);

  return (
    <div className="flex flex-col">
      <div className="w-full mb-2  border-b p-3">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Vendors</h1>

          <TextIconClickable
            className="w-fit h-12 px-4  bg-black text-white border-gray-300 hover:bg-white rounded hover:text-black  hover:border-2 hover:border-black"
            icon={faAdd}
            iconStyles={{ color: 'white' }}
            title="Add Vendor"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Filter tasks..."
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-auto"
          />
          <CustomTab
            options={options}
            selectedTab={selectedVendorFilter}
            setSelectedTab={setSelectedVendorFilter}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/3 bg-white  border-gray-200">
          <div className="h-full md:h-auto md:overflow-y-auto">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <VendorCard index={i} key={i} />
              ))}
          </div>
        </div>
        <div className="flex-1 px-2">
          <div className="flex items-center justify-between sm:mb-2">
            <h1 className="text-2xl font-bold">Restaurants</h1>

            <TextIconClickable
              className="w-fit h-12 px-4  bg-black text-white border-gray-300 hover:bg-white rounded hover:text-black  hover:border-2 hover:border-black"
              icon={faAdd}
              iconStyles={{ color: 'white' }}
              title="Add Restaurant"
            />
          </div>
          <div className="flex flex-col md:flex-row items-center mb-6">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-lg p-2 w-full md:w-1/3 mb-4 md:mb-0 md:mr-4"
            />
            <CustomTab
              options={options}
              selectedTab={selectedRestaurantFilter}
              setSelectedTab={setSelectedResturantFilter}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full md:h-auto md:overflow-y-auto">
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <RestaurantCard key={i} index={i} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
