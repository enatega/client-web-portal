// Interfaces
import { IIconTextFieldProps } from '@/lib/utils/interfaces';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

// Prime React
import { InputText } from 'primereact/inputtext';

// Styles

export default function CustomIconTextField({
  className,
  iconProperties: { icon, position },
  ...props
}: IIconTextFieldProps) {
  return (
    <IconField iconPosition={position}>
      <InputIcon className={`${icon} cursor-pointer`} />
      <InputText
        className={`w-full focus:outline-none focus:shadow-none border-inherit ${className}`}
        {...props}
      />
    </IconField>
  );
}
