// Interface
import { IDropdownComponentProps } from '@/lib/utils/interfaces';

// Prime React
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import InputSkeleton from '../custom-skeletons/inputfield.skeleton';

const CustomDropdownComponent = ({
  name,
  placeholder,
  options,
  selectedItem,
  setSelectedItem,
  showLabel,
  isLoading = false,
  filter = true,
  ...props
}: IDropdownComponentProps) => {
  const itemTemplate = (option: { label: string }) => {
    return (
      <div className="align-items-center flex">
        <div>{option.label}</div>
      </div>
    );
  };

  return !isLoading ? (
    <div className={`flex w-full flex-col justify-center gap-y-1`}>
      {showLabel && (
        <label htmlFor="username" className="text-sm font-[500]">
          {placeholder}
        </label>
      )}

      <Dropdown
        value={selectedItem}
        options={options}
        onChange={(e: DropdownChangeEvent) => setSelectedItem(name, e.value)}
        optionLabel="label"
        placeholder={placeholder}
        itemTemplate={itemTemplate}
        className="md:w-20rem p-dropdown-no-box-shadow m-0 h-10 w-full border border-gray-300 p-0 align-middle text-sm focus:shadow-none focus:outline-none"
        panelClassName="border-gray-200 border-2"
        filter={filter}
        checkmark={true}
        {...props}
      />
    </div>
  ) : (
    <InputSkeleton />
  );
};

export default CustomDropdownComponent;
