'use client';

// Core
import { createContext, useState } from 'react';

// Interface
import { IProvider } from '@/lib/utils/interfaces';

// Types
import { ISelectedItems, ISidebarContextProps } from '@/lib/utils/interfaces';

export const SidebarContext = createContext({} as ISidebarContextProps);

export const SidebarProvider = ({ children }: IProvider) => {
  const [selectedItem, setSelectedItem] = useState<ISelectedItems | null>(null);

  const onSetSelectedItems = (items: ISelectedItems) => {
    setSelectedItem(items);
  };

  const value: ISidebarContextProps = {
    selectedItem: selectedItem,
    setSelectedItem: onSetSelectedItems,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
