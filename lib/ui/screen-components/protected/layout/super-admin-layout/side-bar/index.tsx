// Core

import { LayoutContext } from '@/lib/context/layout-context';
import {
  IGlobalComponentProps,
  ISidebarMenuItem,
  LayoutContextProps,
} from '@/lib/utils/interfaces';
import {
  faCog,
  faHome,
  faSliders,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import SidebarItem from './side-bar-item';

function Sidebar({ children }: IGlobalComponentProps) {
  const { isSidebarVisible } = useContext<LayoutContextProps>(LayoutContext);
  const [width, setWidth] = useState(isSidebarVisible ? '16rem' : '0');

  useEffect(() => {
    setWidth(isSidebarVisible ? '16rem' : '0');
  }, [isSidebarVisible]);

  return (
    <div className="relative">
      <aside
        className="box-border h-screen transition-all duration-300 ease-in-out overflow-hidden"
        style={{ width }}
      >
        <nav
          className={`pt-2 flex h-full flex-col border-r bg-white shadow-sm ${
            isSidebarVisible ? '' : 'invisible'
          }`}
        >
          <ul className="flex-1 px-3">{children}</ul>
        </nav>
      </aside>
    </div>
  );
}

export default function MakeSidebar() {
  const { isSidebarVisible } = useContext<LayoutContextProps>(LayoutContext);

  const navBarItems: ISidebarMenuItem[] = [
    {
      text: 'My Website',
      route: '#',
      isParent: true,
      icon: faUpRightFromSquare,
      isClickable: true,
    },
    {
      text: 'Home',
      route: '/home',
      isParent: true,
      icon: faHome,
      isClickable: true,
    },
    {
      text: 'General',
      route: '/general',
      isParent: true,
      icon: faCog,
      subMenu: [
        {
          text: 'Vendors',
          route: '/general/vendors',
          isParent: false,
        },
        {
          text: 'Restaurants',
          route: '/general/restaurants',
          isParent: false,
        },
        {
          text: 'Riders',
          route: '/general/riders',
          isParent: false,
        },
        {
          text: 'Users',
          route: '/general/users',
          isParent: false,
        },
      ],
    },
    {
      text: 'Management',
      route: '/management',
      isParent: true,
      icon: faSliders,
      subMenu: [
        {
          text: 'Configuration',
          route: '/management/configurations',
          isParent: false,
        },
        {
          text: 'Coupons',
          route: '/management/coupons',
          isParent: false,
        },
        {
          text: 'Cousins',
          route: '/management/cuisines',
          isParent: false,
        },
        {
          text: 'Banners',
          route: '/management/banners',
          isParent: false,
        },
        {
          text: 'Tipping',
          route: '/management/tippings',
          isParent: false,
        },
        {
          text: 'Commission Rate',
          route: '/management/commission-rates',
          isParent: false,
        },
        {
          text: 'Withdraw Request',
          route: '/management/withdraw-requests',
          isParent: false,
        },
        {
          text: 'Notification',
          route: '/management/notifications',
          isParent: false,
        },
      ],
    },
  ];

  return (
    <>
      <Sidebar>
        {navBarItems.map((item, index) => (
          <SidebarItem key={index} expanded={isSidebarVisible} {...item} />
        ))}
      </Sidebar>
    </>
  );
}