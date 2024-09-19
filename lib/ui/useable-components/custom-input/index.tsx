'use client';

// Interface and Types
import { ICustomNumberTippingProps } from '@/lib/utils/interfaces';

// Hooks
import { useFormikContext } from 'formik';

// Components
import { InputText } from 'primereact/inputtext';

// Styles
import { ITippingsForm } from '@/lib/utils/interfaces/forms/tippings.form.interface';
import classes from './cusom-input.module.css';

export default function CustomNumberTextField({
  className,
  placeholder,
  name,
  value,
  ...props
}: ICustomNumberTippingProps) {
  // Formik
  const { setFieldValue } = useFormikContext<ITippingsForm>();

  const MIN_VALUE = 0;
  const MAX_VALUE = 100;

  const handleIncrease = () => {
    const currentValue = parseFloat(value as string) || 0;
    if (currentValue < MAX_VALUE) {
      setFieldValue(name, currentValue + 1);
    }
  };

  const handleDecrease = () => {
    const currentValue = parseFloat(value as string) || 0;
    if (currentValue > MIN_VALUE) {
      setFieldValue(name, currentValue - 1);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-600">
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
          value={value}
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
