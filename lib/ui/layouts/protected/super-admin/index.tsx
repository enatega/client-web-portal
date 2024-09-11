/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { LayoutContext } from '@/lib/context/layout-context';
// Components
import AppTopbar from '@/lib/ui/screen-components/protected/layout/super-admin-layout/app-bar';
import Sidebar from '@/lib/ui/screen-components/protected/layout/super-admin-layout/side-bar';

// Interface
import { IProvider, LayoutContextProps } from '@/lib/utils/interfaces';

import { useContext } from 'react';

const Layout = ({ children }: IProvider) => {
  const { isSidebarVisible } = useContext<LayoutContextProps>(LayoutContext);

  return (
    <div className="layout-main">
      <div className="layout-top-container">
        <AppTopbar />
      </div>
      <div className="layout-main-container">
        <Sidebar />
        <div
          className={`w-full h-full lg:ml-45 md:ml-${isSidebarVisible ? 64 : 20}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
