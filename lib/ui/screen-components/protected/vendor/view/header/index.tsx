// Core
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

// Context
import { VendorContext } from '@/lib/context/vendor.context';

// Components
import CustomTab from '@/lib/ui/useable-components/custom-tab';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import TextComponent from '@/lib/ui/useable-components/text-field';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';

// Interface
import { IVendorHeaderComponentsProps } from '@/lib/utils/interfaces';

// Constants
import { options } from '@/lib/utils/constants';

export default function VendorHeader({
  selectedVendorFilter,
  setSelectedVendorFilter,
}: IVendorHeaderComponentsProps) {
  // Context
  const { onSetVendorFormVisible } = useContext(VendorContext);

  return (
    <div className="w-full border-b p-3 flex-shrink-0 sm:block hidden">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <TextComponent className="heading-1" text="Vendors" />

        <TextIconClickable
          className="sm:w-auto bg-black text-white border-gray-300 rounded"
          icon={faAdd}
          iconStyles={{ color: 'white' }}
          title="Add Vendor"
          onClick={() => onSetVendorFormVisible(true)}
        />
      </div>

      <div className="w-fit flex flex-colm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="w-60">
          <CustomTextField
            type="text"
            name="vendorFilter"
            maxLength={35}
            placeholder="Search Vendors"
            showLabel={false}
          />
        </div>
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
