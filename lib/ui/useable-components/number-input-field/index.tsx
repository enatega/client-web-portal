// Interfaces
import { INumberTextFieldProps } from '@/lib/utils/interfaces';
import { InputNumber } from 'primereact/inputnumber';
import InputSkeleton from '../custom-skeletons/inputfield.skeleton';

// Prime React

export default function CustomNumberField({
  className,
  placeholder,
  showLabel,
  onChange,
  isLoading = false,
  ...props
}: INumberTextFieldProps) {
  return !isLoading ? (
    <div className={`w-full flex flex-col justify-center gap-y-1`}>
      {showLabel && (
        <label htmlFor="username" className="text-sm font-[500]">
          {placeholder}
        </label>
      )}

      <InputNumber
        className={`w-full h-11 border text-sm border-gray-300 rounded-lg focus:outline-none focus:shadow-none ${className}`}
        placeholder={placeholder}
        onChange={(e) => onChange(props.name, e.value)}
        {...props}
      />
    </div>
  ) : (
    <InputSkeleton />
  );
}
