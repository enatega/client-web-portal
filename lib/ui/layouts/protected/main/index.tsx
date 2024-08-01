/* eslint-disable react-hooks/exhaustive-deps */
'use client';

// Components
import AppTopbar from '@/lib/ui/global-components/protected/app-bar';
import AppFooter from '@/lib/ui/global-components/protected/app-footer';

// Interface
import { ILayoutProvider } from '@/lib/utils/interfaces';

const Layout = ({ children }: ILayoutProvider) => {
  return (
    <>
      <div className="layout-top-container">
        <AppTopbar />
      </div>
      <div className="layout-main-container">
        {children}
        <AppFooter />
      </div>

      {/* <AppConfig /> */}
      {/* <div className="layout-mask"></div> */}
    </>
  );
};

export default Layout;
