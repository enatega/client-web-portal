// Interface and Types
import { IStaffHeaderProps } from '@/lib/utils/interfaces';

// Components
import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';

// Icons
import { faAdd } from '@fortawesome/free-solid-svg-icons';

const StaffHeader = ({ setIsAddStaffVisible }: IStaffHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 w-full flex-shrink-0 bg-white p-3 shadow-sm">
      <div className="flex w-full justify-between">
        <HeaderText className="heading" text="Staffs" />
        <TextIconClickable
          className="rounded border-gray-300 bg-black text-white sm:w-auto"
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
