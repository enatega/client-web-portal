// Interfaces
import { IIconTextFieldProps } from '@/lib/utils/interfaces';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Prime React
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import InputSkeleton from '../custom-skeletons/inputfield.skeleton';

// Styles

export default function CustomIconTextField({
  className,
  iconProperties: { icon, position, style },
  placeholder,
  showLabel,
  isLoading = false,
  ...props
}: IIconTextFieldProps) {
  return !isLoading ? (
    <IconField iconPosition={position}>
      <InputIcon style={style}>
        <FontAwesomeIcon icon={icon} />
      </InputIcon>

      <div className="flex flex-col gap-y-1">
        {showLabel && (
          <label htmlFor="username" className="text-sm font-[500]">
            {placeholder}
          </label>
        )}
        <InputText
          className={`w-full h-11 border px-2 text-sm border-gray-300 focus:outline-none focus:shadow-none border-inherit ${className}`}
          placeholder={placeholder}
          {...props}
        />
      </div>
    </IconField>
  ) : (
    <InputSkeleton />
  );
}
