// Interfaces
import { IIconTextFieldProps } from '@/lib/utils/interfaces';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Prime React
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

// Styles

export default function CustomIconTextField({
  className,
  iconProperties: { icon, position },
  placeholder,
  showLabel,
  ...props
}: IIconTextFieldProps) {
  return (
    <IconField iconPosition={position}>
      <InputIcon>
        <FontAwesomeIcon icon={icon} className="mt-4" />
      </InputIcon>

      <div className="flex flex-col gap-2">
        {showLabel && (
          <label htmlFor="username" className="text-sm font-[500]">
            {placeholder}
          </label>
        )}
        <InputText
          className={`w-full h-10 border px-2 focus:outline-none focus:shadow-none border-inherit ${className}`}
          {...props}
        />
      </div>
    </IconField>
  );
}
