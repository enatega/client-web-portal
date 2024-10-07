'use client';

// Core
import { createContext, useState } from 'react';

// Interface
import { IProvider } from '@/lib/utils/interfaces';

// Types
import { LayoutContextProps } from '@/lib/utils/interfaces';

export const LayoutContext = createContext<LayoutContextProps>(
  {} as LayoutContextProps
);

export const LayoutProvider = ({ children }: IProvider) => {
  const [isSuperAdminSidebarVisible, setShowSuperAdminSidebar] =
    useState<boolean>(false);
  const [isRestaurantSidebarVisible, setRestaurantShowSidebar] =
    useState<boolean>(false);
  const [isVendorSidebarVisible, setVendorShowSidebar] =
    useState<boolean>(false);

  const onShowSuperAdminSidebarHandler = (val?: boolean) => {
    setShowSuperAdminSidebar((prevState) =>
      val === undefined ? !prevState : val
    );
  };

  const onShowRestaurantSidebarHandler = (val?: boolean) => {
    setRestaurantShowSidebar((prevState) =>
      val === undefined ? !prevState : val
    );
  };

  const onShowVendorSidebarHandler = (val?: boolean) => {
    setVendorShowSidebar((prevState) => (val === undefined ? !prevState : val));
  };

  const value: LayoutContextProps = {
    // Super Admin
    isSuperAdminSidebarVisible,
    showSuperAdminSidebar: onShowSuperAdminSidebarHandler,
    // Restaurant
    isRestaurantSidebarVisible,
    showRestaurantSidebar: onShowRestaurantSidebarHandler,
    // Vendor
    isVendorSidebarVisible,
    showVendorSidebar: onShowVendorSidebarHandler,
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};
