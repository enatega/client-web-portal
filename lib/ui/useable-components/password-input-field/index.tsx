import { IPasswordTextFieldProps } from '@/lib/utils/interfaces';
import { Password } from 'primereact/password';

export default function CustomPasswordTextField({
  className,
  placeholder,
  showLabel,
  feedback = true,
  ...props
}: IPasswordTextFieldProps) {
  return (
    <div className="flex flex-col gap-y-1 rounded-lg">
      {showLabel && (
        <label htmlFor="username" className="text-sm font-[500]">
          {placeholder}
        </label>
      )}
      <Password
        className={`w-full h-11 border rounded-lg text-sm border-gray-300 focus:outline-none focus:shadow-none border-inherit ${className}`}
        placeholder={placeholder}
        toggleMask
        feedback={feedback}
        {...props}
      />
    </div>
  );
}
