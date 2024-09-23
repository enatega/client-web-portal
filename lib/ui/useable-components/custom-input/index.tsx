'use client';

// Interface and Types
import { INumberTextFieldProps } from '@/lib/utils/interfaces';

// Hooks
import { useFormikContext } from 'formik';

// Components
import { InputNumber } from 'primereact/inputnumber';
import InputSkeleton from '../custom-skeletons/inputfield.skeleton';

// Styles
import classes from './custom-input.module.css';

export default function CustomNumberTextField({
  className,
  placeholder,
  name,
  value,
  isLoading = false,
  onChange,
  ...props
}: INumberTextFieldProps) {
  // Formik
  const { setFieldValue } = useFormikContext();

  const MIN_VALUE = 1;
  const MAX_VALUE = 100;

  const handleIncrease = () => {
    const currentValue = value || 0;
    if (currentValue < MAX_VALUE) {
      setFieldValue(name, currentValue + 1);
    }
  };

  const handleDecrease = () => {
    const currentValue = value || 0;
    if (currentValue > MIN_VALUE) {
      setFieldValue(name, currentValue - 1);
    }
  };

  return !isLoading ? (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-600">
        {placeholder}
      </label>

      <div className="relative flex items-center justify-between">
        {/* Decrease */}
        <div
          className="absolute cursor-pointer left-2 h-6 w-6 rounded-full border flex items-center justify-center hover:bg-slate-200 border-[#E4E4E7]"
          onClick={handleDecrease}
        >
          <span className="text-gray-500">-</span>
        </div>

        <InputNumber
          className={`${classes.inputNumber} bg-white w-full h-11 border px-10 text-center focus:outline-none focus:shadow-none border-inherit ${className}`}
          name={name}
          value={value}
          suffix=" %"
          useGrouping={false}
          onChange={(e) => onChange(name, e.value)}
          {...props}
        />

        {/* Increase */}
        <div
          className="absolute cursor-pointer right-2 h-6 w-6 rounded-full border flex items-center justify-center hover:bg-slate-200 border-[#E4E4E7]"
          onClick={handleIncrease}
        >
          <span className="text-gray-500">+</span>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <InputSkeleton />
    </div>
  );
}
