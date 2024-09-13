'use client';

// Core
import { useState } from 'react';

// Interfaces
import { IPhoneTextFieldProps } from '@/lib/utils/interfaces';

// Constants
import { CountryCodes } from '@/lib/utils/constants/country-codes';

// Prime React
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';

// Styles
import classes from './phone-input-field.module.css';

export default function CustomPhoneTextField({
  className,
  style,
  showLabel,
  placeholder = '',
  ...props
}: IPhoneTextFieldProps) {
  const [selectedCity, setSelectedCity] = useState('+44');

  return (
    <div className="relative w-full flex flex-col justify-center gap-y-1">
      {showLabel && (
        <label htmlFor="username" className="text-sm font-[500]">
          {placeholder}
        </label>
      )}
      <div
        style={style}
        className={`flex items-center border border-gray-300 rounded-md overflow-hidden ${className}`}
      >
        <Dropdown
          className={`bg-gray-200 border-r border-gray-300 p-2 rounded-l-sm focus:outline-none ${classes.dropdown}`}
          options={CountryCodes}
          value={selectedCity}
          optionLabel="label"
          virtualScrollerOptions={{ itemSize: 30 }}
          onChange={(e) => setSelectedCity(e.value)}
        />
        <InputMask
          className="flex-1 p-2 border-none rounded-r-sm focus:outline-none"
          placeholder={placeholder}
          {...props}
        />
      </div>
    </div>
  );
}
