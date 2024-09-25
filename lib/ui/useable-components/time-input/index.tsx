import { ITimeTextField } from '@/lib/utils/interfaces';
import { Calendar } from 'primereact/calendar';
import InputSkeleton from '../custom-skeletons/inputfield.skeleton';

const CustomTimeInput = ({
  className,
  placeholder,
  showLabel,
  isLoading = false,
  value,
  ...props
}: ITimeTextField) => {
  return !isLoading ? (
    <div className={`flex w-full flex-col justify-center gap-y-1`}>
      {showLabel && (
        <label htmlFor="time12" className="text-sm font-[500]">
          {placeholder}
        </label>
      )}

      <Calendar
        id="time12"
        value={value}
        timeOnly
        hourFormat="12"
        className={`h-10 w-full rounded-lg border border-gray-300 text-sm outline-none focus:shadow-none focus:outline-none ${className}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  ) : (
    <InputSkeleton />
  );
};

export default CustomTimeInput;
