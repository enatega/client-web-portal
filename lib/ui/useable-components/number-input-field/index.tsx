// Interfaces
import { INumberTextFieldProps } from '@/lib/utils/interfaces';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import InputSkeleton from '../custom-skeletons/inputfield.skeleton';

// Prime React

export default function CustomNumberField({
  className,
  placeholder,
  name,
  showLabel,
  onChange,
  onChangeFieldValue,
  isLoading = false,
  ...props
}: INumberTextFieldProps) {
  const onNumberChangeHandler = (e: InputNumberChangeEvent) => {
    if (onChange) {
      onChange(name, e.value);
    } else if (onChangeFieldValue) {
      onChangeFieldValue(name, e.value ?? 0);
    } else {
      alert(`Either pass onChange or setFieldValue ${name}`);
    }
  };

  return !isLoading ? (
    <div className={`w-full flex flex-col justify-center gap-y-1`}>
      {showLabel && (
        <label htmlFor="username" className="text-sm font-[500]">
          {placeholder}
        </label>
      )}

      <InputNumber
        className={`w-full h-10 border text-sm border-gray-300 rounded-lg focus:outline-none focus:shadow-none ${className}`}
        placeholder={placeholder}
        onChange={(e) => onNumberChangeHandler(e)}
        maxLength={props.max?.toString().length}
        {...props}
      />
    </div>
  ) : (
    <InputSkeleton />
  );
}
