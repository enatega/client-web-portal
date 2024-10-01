'use client';

// Core
import { useContext, useEffect } from 'react';

// Context
import { LayoutContext } from '@/lib/context/layout.context';

// Interface & Types
import {
  IGlobalComponentProps,
  ISidebarMenuItem,
  LayoutContextProps,
} from '@/lib/utils/interfaces';

// Icons
import {
  faCog,
  faHome,
  faSliders,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';

// Constants and Utiils
import useCheckAllowedRoutes from '@/lib/hooks/useCheckAllowedRoutes';

// Components
import SidebarItem from './side-bar-item';

function SuperAdminSidebar({ children }: IGlobalComponentProps) {
  const { isSidebarVisible, showSidebar } =
    useContext<LayoutContextProps>(LayoutContext);

  // Detect clicks outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('super-admin-sidebar');
      const iconContainer = document.getElementById('sidebar-opening-icon'); // Assuming this is the ID of the icon container
      if (
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        iconContainer &&
        !iconContainer.contains(event.target as Node)
      ) {
        showSidebar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSidebar]);

  return (
    <div className="relative">
      <aside
        id="super-admin-sidebar"
        className={`box-border transform overflow-hidden transition-all duration-300 ease-in-out ${isSidebarVisible ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'}`}
      >
        <nav
          className={`flex h-full flex-col border-r bg-white shadow-sm transition-opacity duration-300 ${isSidebarVisible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          <ul className="flex-1 pl-2">{children}</ul>
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
      subMenu: useCheckAllowedRoutes([
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
        {
          text: 'Staff',
          route: '/general/staff',
          isParent: false,
        },
      ]),
      shouldShow: function () {
        return this.subMenu ? this.subMenu.length > 0 : false;
      },
    },
    {
      text: 'Management',
      route: '/management',
      isParent: true,
      icon: faSliders,
      subMenu: useCheckAllowedRoutes([
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
          text: 'Cuisine',
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
      ]),
      shouldShow: function () {
        return this.subMenu ? this.subMenu.length > 0 : false;
      },
    },
  ];

  return (
    <>
      <SuperAdminSidebar>
        <div className="h-[92vh] overflow-y-auto overflow-x-hidden pr-2">
          {navBarItems.map((item, index) =>
            item.shouldShow && !item.shouldShow() ? null : (
              <SidebarItem key={index} expanded={isSidebarVisible} {...item} />
            )
          )}
        </div>
      </SuperAdminSidebar>
    </>
  );
}
