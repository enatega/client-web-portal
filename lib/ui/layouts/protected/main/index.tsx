/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { LayoutContext } from '@/lib/context/layout-context';
// Components
import AppTopbar from '@/lib/ui/screen-components/protected/app-bar';
import Sidebar from '@/lib/ui/screen-components/protected/side-bar';

// Interface
import { ILayoutProvider } from '@/lib/utils/interfaces';
import { LayoutContextProps } from '@/lib/utils/types';
import { useContext } from 'react';

const Layout = ({ children }: ILayoutProvider) => {
  const { isSidebarVisible } = useContext<LayoutContextProps>(LayoutContext);

  return (
    <div className="layout-main">
      <div className="layout-top-container">
        <AppTopbar />
      </div>
      <div className="layout-main-container">
        <Sidebar />
        <div
          className={`w-full h-full lg:ml-0 md:ml-${isSidebarVisible ? 64 : 0} p-6`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
