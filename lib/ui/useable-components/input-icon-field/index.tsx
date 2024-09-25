'use client';

// Interfaces
import { IIconTextFieldProps } from '@/lib/utils/interfaces';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Prime React
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

// Utilities
import { twMerge } from 'tailwind-merge';

// Components
import InputSkeleton from '../custom-skeletons/inputfield.skeleton';

// Styles

export default function CustomIconTextField({
  className,
  iconProperties,
  placeholder,
  showLabel,
  isLoading = false,
  ...props
}: IIconTextFieldProps) {
  const { icon, position, style } = iconProperties;

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
          className={twMerge(
            `w-full h-10 rounded-lg px-2 text-sm border border-gray-300 focus:outline-none focus:shadow-none`,
            className
          )}
          placeholder={placeholder}
          {...props}
        />
      </div>
    </IconField>
  ) : (
    <InputSkeleton />
  );
}
