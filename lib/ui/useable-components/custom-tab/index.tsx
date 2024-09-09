import { ICustomTabProps } from '@/lib/utils/interfaces';

const CustomTab = ({
  options,
  selectedTab,
  setSelectedTab,
}: ICustomTabProps) => {
  return (
    <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg">
      {options.map((option) => (
        <div
          key={String(option)}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
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
