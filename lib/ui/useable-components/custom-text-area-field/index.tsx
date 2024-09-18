import { ICustomTextAreaField } from '@/lib/utils/interfaces/custom-text-area.interface';
import { InputTextarea } from 'primereact/inputtextarea';

export default function CustomTextAreaField({
  label,
  className,
  placeholder,
  showLabel,
  value,
  name,
  onChange,
  ...props
}: ICustomTextAreaField) {
  return (
    <div className="flex flex-col gap-y-1 justify-center">
      {showLabel && (
        <label htmlFor={name ?? 'text-area'} className="text-sm font-[500]">
          {label}
        </label>
      )}
      <InputTextarea
        value={value}
        className={`${className} border border-gray-300 p-1`}
        id={name ?? 'text-area'}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}
