// Interface and Types
import { IRiderHeaderProps } from '@/lib/utils/interfaces/rider.interface';

// Components
import CustomTextField from '@/lib/ui/useable-components/input-field';
import TextComponent from '@/lib/ui/useable-components/text-field';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';

// Icons
import { faAdd } from '@fortawesome/free-solid-svg-icons';

const RiderHeader = ({
  setIsAddRiderVisible,
  globalFilterValue,
  onGlobalFilterChange,
}: IRiderHeaderProps) => {
  return (
    <div className="flex flex-col mx-[-15px] mb-4 gap-6">
      <div className="flex w-full justify-between">
        <TextComponent className="text-4xl font-bold" text="Rider" />
        <TextIconClickable
          className="sm:w-auto bg-black text-white border-gray-300 rounded"
          icon={faAdd}
          iconStyles={{ color: 'white' }}
          title="Add Rider"
          onClick={() => setIsAddRiderVisible(true)}
        />
      </div>
      <div className="w-fit flex flex-colm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <CustomTextField
          type="text"
          name="vendorFilter"
          maxLength={35}
          showLabel={false}
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
        />
      </div>
    </div>
  );
};

export default RiderHeader;
