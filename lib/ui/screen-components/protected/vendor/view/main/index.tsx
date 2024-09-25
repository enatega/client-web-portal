// Core
import { useContext } from 'react';

// UI Components
import { RestaurantContext } from '@/lib/context/restaurant.context';
import CustomTab from '@/lib/ui/useable-components/custom-tab';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import RestaurantCard from '@/lib/ui/useable-components/resturant-card';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import VendorCard from '@/lib/ui/useable-components/vendor-card';

// Context
import { VendorContext } from '@/lib/context/vendor.context';

// Interface
import { IVendorMainComponentProps } from '@/lib/utils/interfaces';

// Constants
import { options, SELECTED_VENDOR } from '@/lib/utils/constants';

// Icons
import CustomRestaurantCardSkeleton from '@/lib/ui/useable-components/custom-skeletons/restaurant.card.skeleton';
import CustomVendorSkeleton from '@/lib/ui/useable-components/custom-skeletons/vendor.skeleton';
import HeaderText from '@/lib/ui/useable-components/header-text';
import { onUseLocalStorage } from '@/lib/utils/methods';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { Chip } from 'primereact/chip';

export default function VendorMain({
  activeTab,
  selectedRestaurantFilter,
  setSelectedResturantFilter,
  selectedVendorFilter,
  setSelectedVendorFilter,
}: IVendorMainComponentProps) {
  // Context
  const {
    onSetVendorFormVisible,
    globalFilter,
    onSetGlobalFilter,
    filtered,
    vendorResponse,
  } = useContext(VendorContext);

  const {
    onSetRestaurantFormVisible,
    restaurantByOwnerResponse,

    restaurantContextData,
    onSetRestaurantContextData,
  } = useContext(RestaurantContext);

  const vendors = globalFilter ? filtered : vendorResponse?.data?.vendors;
  const restaurants = restaurantContextData.globalFilter
    ? restaurantContextData?.filtered
    : restaurantByOwnerResponse?.data?.restaurantByOwner?.restaurants;

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
            <HeaderText text="Vendors" />
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
              value={globalFilter}
              onChange={(e) => onSetGlobalFilter(e.target.value)}
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
          {vendorResponse?.loading ? (
            new Array(10)
              .fill(0)
              .map((_, i: number) => <CustomVendorSkeleton key={i} />)
          ) : vendors ? (
            vendors?.map((vendor) => (
              <VendorCard
                key={vendor._id}
                _id={vendor._id}
                email={vendor.email}
                userType={vendor.userType}
                totalRestaurants={vendor?.restaurants?.length ?? 0}
              />
            ))
          ) : (
            <div className="flex justify-center items-center h-64 px-4">
              <div className="text-gray-500 text-base sm:text-lg font-semibold text-center">
                No Vendors Found.
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={`flex-1 px-2 overflow-y-auto border-l border-gray-200 ${
          activeTab === 'restaurants' ? '' : 'hidden sm:block'
        }`}
      >
        {/* Header for Restaurants section */}
        <div className="pt-3 pb-2  border-b">
          <div className="flex justify-between items-center mb-4">
            <div className="hidden sm:block">
              <HeaderText text="Restaurants" />
            </div>
            <div className="sm:hidden flex flex-col">
              <HeaderText text="Restaurants" />

              <Chip
                label={`${(onUseLocalStorage('get', SELECTED_VENDOR) ?? '').slice(0, 20)}`}
                className="w-full"
              />
            </div>
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
                value={restaurantContextData.globalFilter}
                onChange={(e) =>
                  onSetRestaurantContextData({
                    globalFilter: e.target.value,
                  })
                }
              />
            </div>
            <CustomTab
              options={options}
              selectedTab={selectedRestaurantFilter}
              setSelectedTab={setSelectedResturantFilter}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-16 pt-">
          {restaurantByOwnerResponse?.loading ? (
            new Array(10)
              .fill(0)
              .map((_, i: number) => <CustomRestaurantCardSkeleton key={i} />)
          ) : restaurants ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))
          ) : (
            <div className="flex justify-center items-center h-64 px-4 col-span-full">
              <div className="text-gray-500 text-base sm:text-lg font-semibold text-center">
                No Restaurants Found.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
