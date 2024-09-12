// Interfaces
import { ITextFieldProps } from '@/lib/utils/interfaces';

// Prime React
import { InputText } from 'primereact/inputtext';

// Styles

export default function CustomTextField({
  className,
  placeholder,
  showLabel,
  ...props
}: ITextFieldProps) {
  return (
    <div className={`w-full flex flex-col justify-center gap-2`}>
      {showLabel && (
        <label htmlFor="username" className="text-sm font-[500]">
          {placeholder}
        </label>
      )}

      <InputText
        className={`w-full h-10 border px-2 text-sm border-gray-300 focus:outline-none focus:shadow-none ${className}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
