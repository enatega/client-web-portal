// Interface and Types
import { IStaffHeaderProps } from '@/lib/utils/interfaces';

// Components
import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';

// Icons
import { faAdd } from '@fortawesome/free-solid-svg-icons';

const StaffHeader = ({ setIsAddStaffVisible }: IStaffHeaderProps) => {
  return (
    <div className="flex flex-col mx-[-15px] mb-4 gap-6">
      <div className="flex w-full justify-between">
        <HeaderText className="heading" text="Staffs" />
        <TextIconClickable
          className="sm:w-auto bg-black text-white border-gray-300 rounded"
          icon={faAdd}
          iconStyles={{ color: 'white' }}
          title="Add Staff"
          onClick={() => setIsAddStaffVisible(true)}
        />
      </div>
    </div>
  );
};

export default StaffHeader;