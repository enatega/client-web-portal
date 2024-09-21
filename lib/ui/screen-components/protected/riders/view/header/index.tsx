// Interface and Types
import { IRiderHeaderProps } from '@/lib/utils/interfaces/rider.interface';

// Components
import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';

// Icons
import { faAdd } from '@fortawesome/free-solid-svg-icons';

const RiderHeader = ({ setIsAddRiderVisible }: IRiderHeaderProps) => {
  return (
    <div className="flex flex-col mx-[-15px] mb-4 gap-6">
      <div className="flex w-full justify-between">
        <HeaderText className="heading" text="Riders" />
        <TextIconClickable
          className="sm:w-auto bg-black text-white border-gray-300 rounded"
          icon={faAdd}
          iconStyles={{ color: 'white' }}
          title="Add Rider"
          onClick={() => setIsAddRiderVisible(true)}
        />
      </div>
    </div>
  );
};

export default RiderHeader;
