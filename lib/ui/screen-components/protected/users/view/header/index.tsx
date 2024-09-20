// Components
import HeaderText from '@/lib/ui/useable-components/header-text';

const UserHeader = () => {
  return (
    <div className="flex flex-col mx-[-15px] mb-4 gap-6">
      <div className="flex w-full justify-between">
        <HeaderText className="heading" text="Users" />
      </div>
    </div>
  );
};

export default UserHeader;
