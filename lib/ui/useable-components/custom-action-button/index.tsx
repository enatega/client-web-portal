import { IGlobalButtonProps } from '@/lib/utils/interfaces/action.button.interface';
import CustomMultiSelectComponent from '../custom-multi-select';

export default function CustomActionActionButton({
  Icon,
  title,
  statusOptions,
  selectedOption,
  handleOptionChange,
  name,
}: IGlobalButtonProps) {
  return (
    <CustomMultiSelectComponent
      name={name}
      options={statusOptions}
      selectedItems={selectedOption}
      setSelectedItems={handleOptionChange}
      placeholder={title}
      dropDownIcon={Icon}
      className="border border-dashed border-gray-400 h-custom-button w-32 bg-transparent"
    />
  );
}
