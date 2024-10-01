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
    <div className="relative flex w-full flex-col justify-center gap-y-1">
      {showLabel && (
        <label htmlFor="phone" className="text-sm font-[500]">
          {placeholder}
        </label>
      )}
      <div
        style={style}
        className={`flex items-center overflow-hidden rounded-md border border-gray-300 ${className}`}
      >
        <Dropdown
          className="rounded-l-sm border-r border-gray-300 bg-gray-200 p-2 focus:outline-none"
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
          className="flex-1 rounded-r-sm border-none p-2 focus:outline-none"
        />
      </div>
    </div>
  ) : (
    <InputSkeleton />
  );
}
