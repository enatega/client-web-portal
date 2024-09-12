// Interface
import { IVendorMobileTabsComponentProps } from '@/lib/utils/interfaces';

export default function VendorMobilesTabs({
  activeTab,
  setActiveTab,
}: IVendorMobileTabsComponentProps) {
  return (
    <div className="sm:hidden flex border-b bg-gray-100">
      <button
        className={`flex-1 py-2 px-4 text-center ${
          activeTab === 'vendors'
            ? 'bg-white font-bold border-b-2 border-black'
            : ''
        }`}
        onClick={() => setActiveTab('vendors')}
      >
        Vendors
      </button>
      <button
        className={`flex-1 py-2 px-4 text-center ${
          activeTab === 'restaurants'
            ? 'bg-white font-bold border-b-2 border-black'
            : ''
        }`}
        onClick={() => setActiveTab('restaurants')}
      >
        Restaurants
      </button>
    </div>
  );
}
