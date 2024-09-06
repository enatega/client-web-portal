'use client';

// Core
import { createContext, useState } from 'react';

// Interface
import { ILayoutProvider } from '@/lib/utils/interfaces';

// Types
import { SidebarContextProps } from '@/lib/utils/types';

export const SidebarContext = createContext({} as SidebarContextProps);

export const SidebarProvider = ({ children }: ILayoutProvider) => {
  const [expandedKeys, setExpandedKeys] = useState<{}>({});

  const onSetSidebarExpandedItemKeys = (keys: {}) => {
    console.log(keys);
    setExpandedKeys(keys);
  };

  const value: SidebarContextProps = {
    expandedKeys: expandedKeys,
    setSidebarExpandedItemKeys: onSetSidebarExpandedItemKeys,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
