// Core
import { useContext, useEffect, useState } from 'react';

// Context
import { LayoutContext } from '@/lib/context/layout-context';

// Interface & Types
import {
  IGlobalComponentProps,
  ISidebarMenuItem,
  LayoutContextProps,
} from '@/lib/utils/interfaces';

// Icons
import {
  faArrowLeft,
  faCog,
  faHome,
  faSliders,
} from '@fortawesome/free-solid-svg-icons';

// Components
import SidebarItem from './side-bar-item';

function AdminSidebar({ children }: IGlobalComponentProps) {
  // Context
  const { isAdminSidebarVisible } =
    useContext<LayoutContextProps>(LayoutContext);

  // States
  const [width, setWidth] = useState(isAdminSidebarVisible ? '16rem' : '0');

  // Effects
  useEffect(() => {
    setWidth(isAdminSidebarVisible ? '16rem' : '0');
  }, [isAdminSidebarVisible]);

  return (
    <div className="relative">
      <aside
        className="box-border h-screen transition-all duration-300 ease-in-out overflow-hidden"
        style={{ width }}
      >
        <nav
          className={`pt-2 flex h-full flex-col border-r bg-white shadow-sm ${
            isAdminSidebarVisible ? '' : 'invisible'
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
      text: 'Dashboard',
      route: '/admin/restaurant/dashboard',
      isParent: true,
      icon: faHome,
      isClickable: true,
    },
    {
      text: 'Profile',
      route: '/admin/restaurant/profile',
      isParent: true,
      icon: faHome,
      isClickable: true,
    },
    {
      text: 'Food Management',
      route: '/admin/restaurant/food-management',
      isParent: true,
      icon: faCog,
      subMenu: [
        {
          text: 'Food',
          route: '/admin/restaurant/food-management/food',
          isParent: false,
        },
        {
          text: 'Category',
          route: '/admin/restaurant/food-management/category',
          isParent: false,
        },
        {
          text: 'Options',
          route: '/admin/restaurant/food-management/options',
          isParent: false,
        },
        {
          text: 'Addons',
          route: '/admin/restaurant/food-management/add-ons',
          isParent: false,
        },
      ],
    },
    {
      text: 'General',
      route: '/admin/restaurant/general',
      isParent: true,
      icon: faSliders,
      subMenu: [
        {
          text: 'Timing',
          route: '/admin/restaurant/general/timing',
          isParent: false,
        },
        {
          text: 'Payments',
          route: '/admin/restaurant/general/payments',
          isParent: false,
        },
        {
          text: 'Ratings',
          route: '/admin/restaurant/general/ratings',
          isParent: false,
        },
      ],
    },
    {
      text: 'Back to Admin',
      route: '/home',
      isParent: true,
      icon: faArrowLeft,
      isClickable: true,
      isLastItem: true,
    },
  ];

  return (
    <>
      <AdminSidebar>
        {navBarItems.map((item, index) => (
          <SidebarItem key={index} expanded={isSidebarVisible} {...item} />
        ))}
      </AdminSidebar>
    </>
  );
}
