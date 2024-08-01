'use client';

// Core
import { createContext, useState } from 'react';

// Interface
import { ILayoutProvider } from '@/lib/utils/interfaces';

// Types
import {
  LayoutConfig,
  LayoutContextProps,
  LayoutState,
} from '@/lib/utils/types';

export const LayoutContext = createContext({} as LayoutContextProps);

export const LayoutProvider = ({ children }: ILayoutProvider) => {
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
    ripple: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    colorScheme: 'light',
    theme: 'lara-light-indigo',
    scale: 14,
  });

  const [layoutState, setLayoutState] = useState<LayoutState>({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
  });

  const showProfileSidebar = () => {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      profileSidebarVisible: !prevLayoutState.profileSidebarVisible,
    }));
  };

  const value: LayoutContextProps = {
    layoutConfig,
    setLayoutConfig,
    layoutState,
    setLayoutState,
    showProfileSidebar,
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};
