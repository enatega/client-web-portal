import { VendorContext } from '@/lib/context/vendor-context';
import CustomTab from '@/lib/ui/useable-components/custom-tab';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import TextComponent from '@/lib/ui/useable-components/text-field';
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
          className="w-full sm:w-auto"
        />
      </div>
    </div>
  );
}
