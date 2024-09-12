// UI Components
import { RestaurantContext } from '@/lib/context/restaurant-context';
import { VendorContext } from '@/lib/context/vendor-context';
import CustomTab from '@/lib/ui/useable-components/custom-tab';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import RestaurantCard from '@/lib/ui/useable-components/resturant-card';
import TextComponent from '@/lib/ui/useable-components/text-field';
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
  const { onSetRestaurantFormVisible } = useContext(RestaurantContext);

  return (
    <div className="flex flex-col sm:flex-row flex-grow overflow-hidden">
      <div
        className={`w-full sm:w-1/3 bg-white border-gray-200 overflow-y-auto ${
          activeTab === 'vendors' ? '' : 'hidden sm:block'
        }`}
      >
        {/* Mobile-only header for Vendors section */}
        <div className="sm:hidden mt-3 p-3 border-b">
          <div className="flex justify-between items-center mb-4">
            <TextComponent className="heading-1" text="Vendors" />
            <TextIconClickable
              className="sm:w-auto  bg-black text-white border-gray-300 rounded"
              icon={faAdd}
              iconStyles={{ color: 'white' }}
              title="Add Vendor"
              onClick={() => onSetVendorFormVisible(true)}
            />
          </div>
          <div className="flex flex-col space-y-4">
            <CustomTextField
              type="text"
              name="vendorFilter"
              maxLength={35}
              placeholder="Search Vendors"
              showLabel={false}
            />

            <CustomTab
              options={options}
              selectedTab={selectedVendorFilter}
              setSelectedTab={setSelectedVendorFilter}
            />
          </div>
        </div>

        {/* Vendors content */}
        <div className="pb-16">
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
        <div className="pt-3 pb-2  border-b">
          <div className="flex justify-between items-center mb-4">
            <TextComponent className="heading-1" text="Restaurants" />
            <TextIconClickable
              className="sm:w-auto  bg-black text-white border-gray-300 rounded"
              icon={faAdd}
              iconStyles={{ color: 'white' }}
              title="Add Restaurant"
              onClick={() => onSetRestaurantFormVisible(true)}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start md:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-60">
              <CustomTextField
                type="text"
                name="restaurantFilter"
                maxLength={35}
                placeholder="Search Restaurants"
                showLabel={false}
              />
            </div>
            <CustomTab
              options={options}
              selectedTab={selectedRestaurantFilter}
              setSelectedTab={setSelectedResturantFilter}
            />
          </div>
        </div>

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
