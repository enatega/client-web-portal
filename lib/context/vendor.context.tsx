'use client';

// Core
import { createContext, useState } from 'react';

// Interface
import { IProvider, IVendorContextProps } from '@/lib/utils/interfaces';

export const VendorContext = createContext<IVendorContextProps>(
  {} as IVendorContextProps
);

export const VendorProvider = ({ children }: IProvider) => {
  const [vendorFormVisible, setVendorFormVisible] = useState<boolean>(false);
  const [vendorId, setVendorId] = useState<number | null>(null);

  const onSetVendorFormVisible = (status: boolean) => {
    setVendorFormVisible(status);
  };

  const onSetVendorId = (val: number) => {
    setVendorId(val);
  };

  const value: IVendorContextProps = {
    vendorFormVisible,
    onSetVendorFormVisible,
    vendorId,
    onSetVendorId,
  };

  return (
    <VendorContext.Provider value={value}>{children}</VendorContext.Provider>
  );
};
