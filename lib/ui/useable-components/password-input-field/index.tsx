// Interfaces
import { IPasswordTextFieldProps } from '@/lib/utils/interfaces';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';

// Prime React

// Styles

export default function CustomPasswordTextField({
  className,
  iconProperties: { icon, position },
  placeholder,
  showLabel,
  ...props
}: IPasswordTextFieldProps) {
  // States
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const _icon = icon ? icon : isVisible ? faEyeSlash : faEye;

  return (
    <IconField iconPosition={position}>
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