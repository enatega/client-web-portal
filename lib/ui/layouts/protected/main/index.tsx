/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { LayoutContext } from '@/lib/context/layout-context';
// Components
import AppTopbar from '@/lib/ui/global-components/protected/app-bar';
import AppFooter from '@/lib/ui/global-components/protected/app-footer';
import Sidebar from '@/lib/ui/global-components/protected/side-bar';

// Interface
import { ILayoutProvider } from '@/lib/utils/interfaces';
import { LayoutContextProps } from '@/lib/utils/types';
import { useContext } from 'react';

const Layout = ({ children }: ILayoutProvider) => {
  const { isSidebarVisible } = useContext<LayoutContextProps>(LayoutContext);

  return (
    <>
      <div className="layout-top-container">
        <AppTopbar />
      </div>
      <div className="layout-main-container">
        <Sidebar />
        <div className={`lg:ml-0 md:ml-${isSidebarVisible ? 64 : 0} p-6`}>
          {children}
          <AppFooter />
        </div>
      </div>

      {/* <AppConfig /> */}
      {/* <div className="layout-mask"></div> */}
    </>
  );
};

export default Layout;
