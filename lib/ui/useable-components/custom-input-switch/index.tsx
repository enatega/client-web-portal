import { ICustomInputSwitchComponentProps } from '@/lib/utils/interfaces';
import CustomLoader from '../custom-progress-indicator';

export default function CustomInputSwitch({
  loading,
  isActive,
  label,
  onChange,
}: ICustomInputSwitchComponentProps) {
  return loading ? (
    <CustomLoader />
  ) : (
    <label className="ml-2 flex items-center cursor-pointer flex-shrink-0">
      <div className="relative">
        <div className="flex items-center space-x-2">
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={isActive}
              onChange={onChange}
            />
            <div className="w-8 h-4 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-primary-color"></div>
            <div className="absolute left-0.5 top-0.5 bg-gray-50 w-3 h-3 rounded-full transition-transform peer-checked:translate-x-5"></div>
          </label>
          {label && <span className="ml-2">{label}</span>}
        </div>
      </div>
    </label>
  );
}
