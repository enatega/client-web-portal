// Core
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

// Prime React
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

// Icons
import { faEye } from '@fortawesome/free-solid-svg-icons';

// Interfaces
import { IPasswordTextFieldProps } from '@/lib/utils/interfaces';

// Prime React

// Styles

export default function CustomPasswordTextField({
  className,
  //  iconProperties: { icon, position },
  placeholder,
  showLabel,
  ...props
}: IPasswordTextFieldProps) {
  // States
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const _icon = faEye;

  return (
    <IconField iconPosition={'left'}>
      <InputIcon
        className="cursor-pointer"
        onClick={() => setIsVisible((prevState) => !prevState)}
      >
        <FontAwesomeIcon icon={_icon} className=" cursor-pointer mt-3" />
      </InputIcon>

      <div className="flex flex-col gap-y-1">
        {showLabel && (
          <label htmlFor="username" className="text-sm font-[500]">
            {placeholder}
          </label>
        )}
        <InputText
          type={isVisible ? 'text' : 'password'}
          className={`w-full h-11 border px-2 text-sm border-gray-300 focus:outline-none focus:shadow-none border-inherit ${className}`}
          placeholder={placeholder}
          {...props}
        />
      </div>
    </IconField>
  );
}
