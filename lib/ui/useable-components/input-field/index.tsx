// Interfaces
import { ITextFieldProps } from '@/lib/utils/interfaces';

// Prime React
import { InputText } from 'primereact/inputtext';

// Styles

export default function CustomTextField({
  className,

  ...props
}: ITextFieldProps) {
  return (
    <InputText
      className={`w-full h-11 border border-gray-300 focus:outline-none focus:shadow-none ${className}`}
      {...props}
    />
  );
}
