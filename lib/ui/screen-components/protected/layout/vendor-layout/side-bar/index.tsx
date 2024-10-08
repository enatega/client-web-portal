// Core
import { useContext, useEffect } from 'react';

// Context
import { LayoutContext } from '@/lib/context/global/layout.context';

// Interface & Types
import {
  IGlobalComponentProps,
  ISidebarMenuItem,
  LayoutContextProps,
} from '@/lib/utils/interfaces';

// Icons
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';

// Components
import SidebarItem from './side-bar-item';

function VendorSidebar({ children }: IGlobalComponentProps) {
  // Context
  const { isVendorSidebarVisible, showVendorSidebar } =
    useContext<LayoutContextProps>(LayoutContext);

  // Detect clicks outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('app-sidebar');
      const iconContainer = document.getElementById('sidebar-opening-icon'); // Assuming this is the ID of the icon container
      if (
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        iconContainer &&
        !iconContainer.contains(event.target as Node)
      ) {
        showVendorSidebar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showVendorSidebar]);

  return (
    <div className="relative">
      <aside
        id="app-sidebar"
        className={`box-border transform overflow-hidden transition-all duration-300 ease-in-out ${isVendorSidebarVisible ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'}`}
      >
        <nav
          className={`flex h-full flex-col border-r bg-white shadow-sm transition-opacity duration-300 ${isVendorSidebarVisible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          <ul className="flex-1 pl-2">{children}</ul>
        </nav>
      </aside>
    </div>
  );
}

export default function MakeVendorSidebar() {
  const { isVendorSidebarVisible } =
    useContext<LayoutContextProps>(LayoutContext);

  const navBarItems: ISidebarMenuItem[] = [
    {
      text: 'Dashboard',
      route: '/admin/vendor/dashboard',
      isParent: true,
      icon: faHome,
      isClickable: true,
    },
    {
      text: 'Profile',
      route: '/admin/vendor/profile',
      isParent: true,
      icon: faUser,
      isClickable: true,
    },
    {
      text: 'Restaurants',
      route: '/admin/vendor/restaurants',
      isParent: true,
      icon: faUser,
      isClickable: true,
    },
  ];

  return (
    <>
      <VendorSidebar>
        <div className="h-[92vh] overflow-y-auto overflow-x-hidden pr-2">
          {navBarItems.map((item, index) => (
            <SidebarItem
              key={index}
              expanded={isVendorSidebarVisible}
              {...item}
            />
          ))}
        </div>
      </VendorSidebar>
    </>
  );
}
