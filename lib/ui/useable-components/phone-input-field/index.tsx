'use client';
import { CountryCodes } from '@/lib/utils/constants/country-codes';
import { IPhoneTextFieldProps } from '@/lib/utils/interfaces';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';

// Styles
import { useState } from 'react';
import InputSkeleton from '../custom-skeletons/inputfield.skeleton';

export default function CustomPhoneTextField({
  className,
  style,
  showLabel,
  placeholder = '',
  isLoading = false,
  value,
  onChange,
}: IPhoneTextFieldProps) {
  const [selectedCountryCode, setSelectedCountryCode] = useState('+44');

  return !isLoading ? (
    <div className="relative w-full flex flex-col justify-center gap-y-1">
      {showLabel && (
        <label htmlFor="phone" className="text-sm font-[500]">
          {placeholder}
        </label>
      )}
      <div
        style={style}
        className={`flex items-center border border-gray-300 rounded-md overflow-hidden ${className}`}
      >
        <Dropdown
          className="bg-gray-200 border-r border-gray-300 p-2 rounded-l-sm focus:outline-none"
          options={CountryCodes}
          value={selectedCountryCode}
          optionLabel="label"
          optionValue="code"
          onChange={(e) => setSelectedCountryCode(e.value)}
        />
        <InputMask
          mask="9999999999"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 p-2 border-none rounded-r-sm focus:outline-none"
        />
      </div>
    </div>
  ) : (
    <InputSkeleton />
  );
}
