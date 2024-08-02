'use client';

// Interfaces
import { CountryCodes } from '@/lib/utils/constants/country-codes';
import { IPhoneTextFieldProps } from '@/lib/utils/interfaces';

// Prime React
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { useState } from 'react';

// Styles
import classes from './phone-input-field.module.css';

export default function CustomPhoneTextField({
  className,
  ...props
}: IPhoneTextFieldProps) {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div className="p-inputgroup gap-2 h-11">
      <Dropdown
        className={`${classes.dropdown} focus:outline-none focus:shadow-none rounded-sm text:sm`}
        options={CountryCodes}
        //value={CountryCodes[0].value}
        editable
        value={selectedCity}
        optionLabel="label"
        virtualScrollerOptions={{ itemSize: 30 }}
        onChange={(e) => setSelectedCity(e.value)}
      />
      <InputMask
        className={`w-5/6 md:w-14rem border border-gray-300 rounded-sm focus:outline-none focus:shadow-none ${className}`}
        {...props}
      />
    </div>
  );
}
