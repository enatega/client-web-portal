'use client';

// Core
import { createContext, useState } from 'react';

// Interface
import { IProvider, IVendorContextProps } from '@/lib/utils/interfaces';

// Types

export const VendorContext = createContext({} as IVendorContextProps);

export const VendorProvider = ({ children }: IProvider) => {
  const [vendorFormVisible, setVendorFormVisible] = useState<boolean>(false);

  const onSetVendorFormVisible = (status: boolean) => {
    console.log('onSetVendor Called');
    setVendorFormVisible(status);
  };

  const value: IVendorContextProps = {
    vendorFormVisible,
    onSetVendorFormVisible,
  };

  return (
    <VendorContext.Provider value={value}>{children}</VendorContext.Provider>
  );
};
