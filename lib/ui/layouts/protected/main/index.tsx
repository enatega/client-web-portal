/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React from 'react';

// Components
import AppTopbar from '@/lib/ui/global-components/protected/app-bar';
import AppFooter from '@/lib/ui/global-components/protected/app-footer';

// Interface
import { ILayoutProvider } from '@/lib/utils/interfaces';

// Styles

const Layout = ({ children }: ILayoutProvider) => {
  return (
    <React.Fragment>
      <div className="layout-top-container">
        <AppTopbar />
      </div>
      <div className="layout-main-container">
        {children}
        <AppFooter />
      </div>

      {/* <AppConfig /> */}
      {/* <div className="layout-mask"></div> */}
    </React.Fragment>
  );
};

export default Layout;
