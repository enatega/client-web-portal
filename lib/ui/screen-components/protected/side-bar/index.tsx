// Core

import { LayoutContext } from '@/lib/context/layout-context';
import {
  IGlobalComponentProps,
  ISidebarMenuItem,
  LayoutContextProps,
} from '@/lib/utils/interfaces';
import {
  faCog,
  faEllipsisV,
  faHome,
  faSliders,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import SidebarItem from './side-bar-item';

function Sidebar({ children }: IGlobalComponentProps) {
  const { isSidebarVisible } = useContext<LayoutContextProps>(LayoutContext);

  return (
    <div className="relative">
      <aside
        className={`box-border h-screen transition-all ${isSidebarVisible ? 'w-5/6 sm:w-64' : 'w-0 sm:hidden'}`}
      >
        <nav
          className={`pt-2 flex h-full flex-col border-r bg-white shadow-sm ${isSidebarVisible ? '' : 'hidden'}`}
        >
          <ul className="flex-1 px-3">{children}</ul>

          <div className="flex border-t p-3">
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Mark+Ruffalo"
              alt=""
              className="h-10 w-10 rounded-md"
            />
            <div
              className={`
                flex items-center justify-between
                overflow-hidden transition-all ${isSidebarVisible ? 'ml-3 w-52' : 'w-0'}
            `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">Mark Ruffalo</h4>
                <span className="text-xs text-gray-600">mark@gmail.com</span>
              </div>
              {/* <EllipsisVerticalIcon className="h-6 w-6" /> */}
              <FontAwesomeIcon icon={faEllipsisV} className="h-6 w-6" />
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
}

export default function MakeSidebar() {
  // Context
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

  // Desktop Sidebar
  return (
    <Sidebar>
      {navBarItems.map((item, index) => (
        <SidebarItem key={index} expanded={isSidebarVisible} {...item} />
      ))}
    </Sidebar>
  );
}
