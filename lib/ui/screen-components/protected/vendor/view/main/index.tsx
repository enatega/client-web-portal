// UI Components
import { VendorContext } from '@/lib/context/vendor-context';
import CustomTab from '@/lib/ui/useable-components/custom-tab';
import RestaurantCard from '@/lib/ui/useable-components/resturant-card';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import VendorCard from '@/lib/ui/useable-components/vendor-card';
import { options } from '@/lib/utils/constants';
import { IVendorMainComponentProps } from '@/lib/utils/interfaces';

// Icons
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

export default function VendorMain({
  activeTab,
  selectedRestaurantFilter,
  setSelectedResturantFilter,
  selectedVendorFilter,
  setSelectedVendorFilter,
}: IVendorMainComponentProps) {
  // Context
  const { onSetVendorFormVisible } = useContext(VendorContext);

  return (
    <div className="flex flex-col sm:flex-row flex-grow overflow-hidden">
      <div
        className={`w-full sm:w-1/3 bg-white border-gray-200 overflow-y-auto ${
          activeTab === 'vendors' ? '' : 'hidden sm:block'
        }`}
      >
        {/* Mobile-only header for Vendors section */}
        <div className="sm:hidden p-3 border-b">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Vendors</h1>
            <TextIconClickable
              className="w-auto h-12 px-4 bg-black text-white border-gray-300 hover:bg-white rounded hover:text-black hover:border-2 hover:border-black"
              icon={faAdd}
              iconStyles={{ color: 'white' }}
              title="Add Vendor"
              onClick={() => onSetVendorFormVisible(true)}
            />
          </div>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Filter tasks..."
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
            <CustomTab
              options={options}
              selectedTab={selectedVendorFilter}
              setSelectedTab={setSelectedVendorFilter}
              className="w-full"
            />
          </div>
        </div>

        {/* Vendors content */}
        <div className="p-2 pb-16">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <VendorCard index={i} key={i} />
            ))}
        </div>
      </div>

      <div
        className={`flex-1 px-2 overflow-y-auto ${
          activeTab === 'restaurants' ? '' : 'hidden sm:block'
        }`}
      >
        {/* Header for Restaurants section */}
        <div className="p-3 border-b">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Restaurants</h1>
            <TextIconClickable
              className="w-auto h-12 px-4 bg-black text-white border-gray-300 hover:bg-white rounded hover:text-black hover:border-2 hover:border-black"
              icon={faAdd}
              iconStyles={{ color: 'white' }}
              title="Add Restaurant"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start md:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              placeholder="Filter tasks..."
              className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto"
            />
            <CustomTab
              options={options}
              selectedTab={selectedRestaurantFilter}
              setSelectedTab={setSelectedResturantFilter}
              className="w-full sm:w-auto"
            />
          </div>
          {/* <div className="flex flex-col md:flex-row  space-y-4">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded px-4 py-2 w-1/3"
            />
            <CustomTab
              options={options}
              selectedTab={selectedRestaurantFilter}
              setSelectedTab={setSelectedResturantFilter}
            />
          </div> */}
        </div>

        {/* Restaurants content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-16 pt-2">
          {Array(12)
            .fill(0)
            .map((_, i) => (
              <RestaurantCard key={i} index={i} />
            ))}
        </div>
      </div>
    </div>
  );
}
