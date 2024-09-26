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
  rows = 0,
  ...props
}: ICustomTextAreaField) {
  return (
    <div className="flex flex-col justify-center gap-y-1">
      {showLabel && (
        <label htmlFor={name ?? 'text-area'} className="text-sm font-[500]">
          {label}
        </label>
      )}
      <InputTextarea
        value={value}
        className={`w-full min-h-20 border px-2 pt-1 text-sm border-gray-300 rounded-lg focus:outline-none focus:shadow-none ${className ?? ''}`}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        rows={rows}
        {...props}
      />
    </div>
  );
}
