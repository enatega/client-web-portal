/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React from 'react';

// Components
import AppTopbar from '@/lib/ui/global-components/unprotected/app-bar';

// Styles
import { ILayoutProvider } from '@/lib/utils/interfaces';

const Layout = ({ children }: ILayoutProvider) => {
  return (
    <React.Fragment>
      <div className="layout-top-container">
        <AppTopbar />
      </div>
      <div className="layout-main-container">
        <div className="h-full">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
