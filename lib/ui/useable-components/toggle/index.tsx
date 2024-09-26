import { IToggleComponentProps } from '@/lib/utils/interfaces/toggle.interface';

const Toggle = ({
  checked,
  onClick,
  disabled,
  showLabel = false,
  placeholder,
}: IToggleComponentProps) => {
  return (
    <div className="flex justify-between items-center">
      {showLabel && <label className="text-sm font-[500]">{placeholder}</label>}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onClick}
          disabled={disabled}
        />
        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-primary-color"></div>
        <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-5"></div>
      </label>
    </div>
  );
};

export default Toggle;
