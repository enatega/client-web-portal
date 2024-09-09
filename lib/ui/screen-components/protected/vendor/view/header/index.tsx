import { VendorContext } from '@/lib/context/vendor-context';
import CustomTab from '@/lib/ui/useable-components/custom-tab';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import { options } from '@/lib/utils/constants';
import { IVendorHeaderComponentsProps } from '@/lib/utils/interfaces';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

export default function VendorHeader({
  selectedVendorFilter,
  setSelectedVendorFilter,
}: IVendorHeaderComponentsProps) {
  // Context
  const { onSetVendorFormVisible } = useContext(VendorContext);

  return (
    <div className="w-full border-b p-3 flex-shrink-0 sm:block hidden">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Vendors</h1>

        <TextIconClickable
          className="w-full sm:w-auto h-12 px-4 bg-black text-white border-gray-300 hover:bg-white rounded hover:text-black hover:border-2 hover:border-black"
          icon={faAdd}
          iconStyles={{ color: 'white' }}
          title="Add Vendor"
          onClick={() => onSetVendorFormVisible(true)}
        />
      </div>
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Filter tasks..."
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto"
        />
        <CustomTab
          options={options}
          selectedTab={selectedVendorFilter}
          setSelectedTab={setSelectedVendorFilter}
          className="w-full sm:w-auto"
        />
      </div>
    </div>
  );
}
