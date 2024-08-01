/* eslint-disable react-hooks/exhaustive-deps */
'use client';

// Components
import AppTopbar from '@/lib/ui/global-components/unprotected/app-bar';

// Styles
import { ILayoutProvider } from '@/lib/utils/interfaces';

const Layout = ({ children }: ILayoutProvider) => {
  return (
    <div className="layout-container">
      <div className="layout-top-container">
        <AppTopbar />
      </div>
      <div className="layout-main-container">
        <div className="layout-main">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
