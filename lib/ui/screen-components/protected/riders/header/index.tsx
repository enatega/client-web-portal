import CustomTextField from '@/lib/ui/useable-components/input-field';
import TextComponent from '@/lib/ui/useable-components/text-field';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import { IRidersHeaderComponentsProps } from '@/lib/utils/interfaces/rider.interface';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

export default function RidersHeader({
  setIsAddRiderVisible,
}: IRidersHeaderComponentsProps) {
  return (
    <div className="w-full border-b p-3 flex-shrink-0 sm:block hidden">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <TextComponent className="heading-1" text="Rider" />

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
          placeholder="Filter tasks...."
          showLabel={false}
        />
      </div>
    </div>
  );
}
