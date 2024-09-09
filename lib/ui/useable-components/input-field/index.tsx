// Interfaces
import { ITextFieldProps } from '@/lib/utils/interfaces';

// Prime React
import { InputText } from 'primereact/inputtext';

// Styles

export default function CustomTextField({
  className,
  placeholder,
  ...props
}: ITextFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="username" className="text-sm font-[500]">
        {placeholder}
      </label>

      <InputText
        className={`w-full h-11 border px-2 border-gray-300 focus:outline-none focus:shadow-none ${className}`}
        // placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
