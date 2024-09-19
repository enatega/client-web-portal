import { IPasswordTextFieldProps } from '@/lib/utils/interfaces';
import { Password } from 'primereact/password';
import InputSkeleton from '../custom-skeletons/inputfield.skeleton';

export default function CustomPasswordTextField({
  className,
  placeholder,
  showLabel,
  feedback = true,
  isLoading = false,
  ...props
}: IPasswordTextFieldProps) {
  return !isLoading ? (
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
  ) : (
    <InputSkeleton />
  );
}
