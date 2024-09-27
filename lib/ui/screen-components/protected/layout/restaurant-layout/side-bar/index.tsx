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
  faArrowLeft,
  faCog,
  faHome,
  faSliders,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

// Components
import SidebarItem from './side-bar-item';

function AdminSidebar({ children }: IGlobalComponentProps) {
  // Context
  const { isAdminSidebarVisible, showAdminSidebar } =
    useContext<LayoutContextProps>(LayoutContext);


    // Detect clicks outside the sidebar
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const sidebar = document.getElementById('admin-sidebar');
        const iconContainer = document.getElementById('sidebar-opening-icon'); // Assuming this is the ID of the icon container
        if (sidebar && !sidebar.contains(event.target as Node) && iconContainer && !iconContainer.contains(event.target as Node)) {
          showAdminSidebar(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [showAdminSidebar]);

  return (
    <div className="relative">
      <aside
        id="admin-sidebar"
        className={`box-border transition-all duration-300 ease-in-out overflow-hidden transform ${isAdminSidebarVisible ? 'translate-x-0 w-64' : '-translate-x-full w-0'}`}
  
      >
        <nav
          className={`flex h-full flex-col border-r bg-white shadow-sm transition-opacity duration-300 ${isAdminSidebarVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
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
      icon: faUser,
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
        <div className="h-[92vh] overflow-y-auto overflow-x-hidden pr-2">
          {navBarItems.map((item, index) => (
            <SidebarItem key={index} expanded={isSidebarVisible} {...item} />
          ))}
        </div>
      </AdminSidebar>
    </>
  );
}
