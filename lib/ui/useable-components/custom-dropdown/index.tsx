import { IDropdownComponentProps } from '@/lib/utils/interfaces';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

export const CustomDropdownComponent = ({
  name,
  placeholder,
  options,
  selectedItem,
  setSelectedItem,
  showLabel,
}: IDropdownComponentProps) => {
  const itemTemplate = (option: { label: string }) => {
    return (
      <div className="flex align-items-center">
        <div>{option.label}</div>
      </div>
    );
  };

  return (
    <div className={`w-full flex flex-col justify-center gap-y-1`}>
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
        className="w-full md:w-20rem h-11 p-0 m-0 border text-sm align-middle border-gray-300 focus:outline-none focus:shadow-none p-dropdown-no-box-shadow"
        panelClassName="border-gray-200 border-2"
        filter={true}
      />
    </div>
  );
};