// Components
import CustomTextField from '@/lib/ui/useable-components/input-field';
import TextComponent from '@/lib/ui/useable-components/text-field';
import { IUsersHeaderProps } from '@/lib/utils/interfaces/users.interface';

const UserHeader = ({
  globalFilterValue,
  onGlobalFilterChange,
}: IUsersHeaderProps) => {
  return (
    <div className="flex flex-col mx-[-15px] mb-4 gap-6">
      <div className="flex w-full justify-between">
        <TextComponent className="text-4xl font-bold" text="User" />
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

export default UserHeader;
