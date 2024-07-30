'use client';
import { ILayoutProvider } from '@/lib/utils/interfaces';
import {
  LayoutConfig,
  LayoutContextProps,
  LayoutState,
} from '@/lib/utils/types';
import { createContext, useState } from 'react';
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

  const onMenuToggle = () => {
    if (isOverlay()) {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        overlayMenuActive: !prevLayoutState.overlayMenuActive,
      }));
    }

    if (isDesktop()) {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive,
      }));
    } else {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive,
      }));
    }
  };

  const showProfileSidebar = () => {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      profileSidebarVisible: !prevLayoutState.profileSidebarVisible,
    }));
  };

  const isOverlay = () => {
    return layoutConfig.menuMode === 'overlay';
  };

  const isDesktop = () => {
    return window.innerWidth > 991;
  };

  const value: LayoutContextProps = {
    layoutConfig,
    setLayoutConfig,
    layoutState,
    setLayoutState,
    onMenuToggle,
    showProfileSidebar,
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};
