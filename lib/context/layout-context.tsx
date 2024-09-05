'use client';

// Core
import { createContext, useState } from 'react';

// Interface
import { ILayoutProvider } from '@/lib/utils/interfaces';

// Types
import { LayoutContextProps } from '@/lib/utils/types';

export const LayoutContext = createContext({} as LayoutContextProps);

export const LayoutProvider = ({ children }: ILayoutProvider) => {
  const [isSidebarVisible, setShowSidebar] = useState<boolean>(false);

  const onShowSidebarHandler = (val?: boolean) => {
    setShowSidebar((prevState) => (val === undefined ? !prevState : val));
  };

  const value: LayoutContextProps = {
    isSidebarVisible: isSidebarVisible,
    showSidebar: onShowSidebarHandler,
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};
