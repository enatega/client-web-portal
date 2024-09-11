/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { LayoutContext } from '@/lib/context/layout-context';
// Components
import AdminAppTopbar from '@/lib/ui/screen-components/protected/layout/restaurant-layout/app-bar';
import AdminSidebar from '@/lib/ui/screen-components/protected/layout/restaurant-layout/side-bar';

// Interface
import { IProvider, LayoutContextProps } from '@/lib/utils/interfaces';

import { useContext } from 'react';

const AdminLayout = ({ children }: IProvider) => {
  const { isAdminSidebarVisible } =
    useContext<LayoutContextProps>(LayoutContext);

  return (
    <div className="layout-main">
      <div className="layout-top-container">
        <AdminAppTopbar />
      </div>
      <div className="layout-main-container">
        <AdminSidebar />
        <div
          className={`w-full h-full lg:ml-45 md:ml-${isAdminSidebarVisible ? 64 : 20}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
