// Interface
import { ICustomTabProps } from '@/lib/utils/interfaces';

const CustomTab = ({
  options,
  selectedTab,
  setSelectedTab,
}: ICustomTabProps) => {
  return (
    <div className="w-fit h-10 flex space-x-2 p-1 bg-gray-100 rounded">
      {options.map((option) => (
        <div
          key={String(option)}
          className={`flex items-center justify-center px-4  rounded cursor-pointer ${
            selectedTab === option
              ? 'bg-white text-black shadow'
              : 'text-gray-500'
          }`}
          onClick={() => setSelectedTab(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default CustomTab;
