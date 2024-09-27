/* eslint-disable react-hooks/exhaustive-deps */
'use client';

// Core
import { useContext } from 'react';

// Context
import { LayoutContext } from '@/lib/context/layout.context';

// Components
import AppTopbar from '@/lib/ui/screen-components/protected/layout/super-admin-layout/app-bar';
import Sidebar from '@/lib/ui/screen-components/protected/layout/super-admin-layout/side-bar';

// Interface
import { IProvider, LayoutContextProps } from '@/lib/utils/interfaces';

const Layout = ({ children }: IProvider) => {
  const { isSidebarVisible } = useContext<LayoutContextProps>(LayoutContext);

  return (
    <div className="layout-main">
      <div className="layout-top-container">
        <AppTopbar />
      </div>
      <div className="layout-main-container">
        <div className="absolute left-0 z-50">
          <Sidebar />
        </div>
        <div
          className={`w-full h-auto lg:ml-45 md:ml-${isSidebarVisible ? 64 : 20}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
