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
  ...props
}: IIconTextFieldProps) {
  return (
    <IconField iconPosition={position}>
      <InputIcon>
        <FontAwesomeIcon icon={icon} className="mt-3" />
      </InputIcon>

      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-sm font-[500]">
          {placeholder}
        </label>
        <InputText
          className={`w-full h-11 border px-2 focus:outline-none focus:shadow-none border-inherit ${className}`}
          // placeholder={placeholder}
          {...props}
        />
      </div>
    </IconField>
  );
}
