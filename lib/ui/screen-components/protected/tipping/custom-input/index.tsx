'use client';
import {
  ICustomNumberTextFieldProps,
  ITippingsForm,
} from '@/lib/utils/interfaces';
import { useFormikContext } from 'formik';
import { InputText } from 'primereact/inputtext';
import classes from './cusom-input.module.css';

export default function CustomNumberTextField({
  className,
  placeholder,
  name,
  value,
  ...props
}: ICustomNumberTextFieldProps) {
  const { setFieldValue } = useFormikContext<ITippingsForm>();
  const currentValue = value;

  const handleIncrease = () => {
    setFieldValue(name, (parseFloat(currentValue as string) || 0) + 1);
  };

  const handleDecrease = () => {
    setFieldValue(name, (parseFloat(currentValue as string) || 0) - 1);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="username" className="text-sm font-medium text-gray-600">
        {placeholder}
      </label>

      <div className="relative flex items-center">
        {/* Decrease */}
        <div
          className="absolute left-2 h-6 w-6 rounded-full border flex items-center justify-center hover:bg-slate-200 border-[#E4E4E7]"
          onClick={handleDecrease}
        >
          <span className="text-gray-500">-</span>
        </div>

        <InputText
          className={`${classes.numberInput} w-full h-11 border px-8 text-center focus:outline-none focus:shadow-none border-inherit ${className}`}
          name={name}
          value={currentValue}
          {...props}
        />

        {/* Increase */}
        <div
          className="absolute right-2 h-6 w-6 rounded-full border flex items-center justify-center hover:bg-slate-200 border-[#E4E4E7]"
          onClick={handleIncrease}
        >
          <span className="text-gray-500">+</span>
        </div>
      </div>
    </div>
  );
}
