'use client';

// Core
import { createContext, useState } from 'react';

// Interface
import { ILayoutProvider } from '@/lib/utils/interfaces';

// Types
import { ISelectedItems, ISidebarContextProps } from '@/lib/utils/types';

export const SidebarContext = createContext({} as ISidebarContextProps);

export const SidebarProvider = ({ children }: ILayoutProvider) => {
  const [selectedItem, setSelectedItem] = useState<ISelectedItems | null>(null);

  const onSetSelectedItems = (items: ISelectedItems) => {
    console.log(items);
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
