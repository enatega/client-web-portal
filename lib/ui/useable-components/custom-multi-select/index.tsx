import { IMultiSelectComponentProps } from '@/lib/utils/interfaces';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';

export const CustomMultiSelectComponent = ({
  name,
  placeholder,
  options,
  selectedItems,
  setSelectedItems,
  showLabel,
}: IMultiSelectComponentProps) => {
  const itemTemplate = (option: { label: string }) => {
    return (
      <div className="flex align-items-center">
        <div>{option.label}</div>
      </div>
    );
  };

  const panelFooterTemplate = () => {
    const length = selectedItems ? selectedItems.length : 0;

    return (
      <div className="py-2 px-3">
        <b>{length}</b> item{length > 1 ? 's' : ''} selected.
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

      <MultiSelect
        value={selectedItems}
        options={options}
        onChange={(e: MultiSelectChangeEvent) =>
          setSelectedItems(name, e.value)
        }
        optionLabel="label"
        placeholder={placeholder}
        itemTemplate={itemTemplate}
        panelFooterTemplate={panelFooterTemplate}
        className="w-full md:w-20rem h-11 p-0 m-0 border text-sm align-middle border-gray-300 focus:outline-none focus:shadow-none"
        panelClassName="border-gray-200 border-2"
        display="chip"
        filter={true}
      />
    </div>
  );
};