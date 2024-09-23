// Components
import HeaderText from '@/lib/ui/useable-components/header-text';

const UserHeader = () => {
  return (
    <div className="w-full flex-shrink-0">
      <div className="flex w-full justify-between">
        <HeaderText text="Users" />
      </div>
    </div>
  );
};

export default UserHeader;
