/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { SidebarContext } from '@/lib/context/sidebar-context';
// Components

// Interface
import { ILayoutProvider } from '@/lib/utils/interfaces';
import { ISidebarContextProps } from '@/lib/utils/types';
import { useContext } from 'react';

const HomeLayout = ({ children }: ILayoutProvider) => {
  // Context
  const { selectedItem } = useContext<ISidebarContextProps>(SidebarContext);

  return (
    <div>
      <div>{selectedItem?.screenName}</div>
      {children}
    </div>
  );
};

export default HomeLayout;
