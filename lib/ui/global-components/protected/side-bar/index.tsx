'use client';

// Core
import { usePathname } from 'next/navigation';
import { ReactNode, useContext, useEffect, useRef } from 'react';

// Prime React
import { PanelMenu } from 'primereact/panelmenu';

// Context
import { LayoutContext } from '@/lib/context/layout-context';

// Interface and Types
import { LayoutContextProps } from '@/lib/utils/types';

// Icons
import {
  faChevronDown,
  faChevronUp,
  faCog,
  faHome,
  faSliders,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Style
import { IItem, IMenuOption, IPanelItem } from '@/lib/utils/interfaces';
import classes from './side-bar.module.css';

export default function Sidebar() {
  // Context
  const { isSidebarVisible /* showSidebar */ } =
    useContext<LayoutContextProps>(LayoutContext);
  // Ref
  const containerRef = useRef<HTMLDivElement>(null);
  // Router
  const pathname = usePathname();

  // Handlers
  /*  const handleClickOutside = (event: MouseEvent) => {
    // Check if the clicked target is outside the container
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      showSidebar(false); // Close the container or handle the click outside
    }
  }; */

  console.log({ pathname });

  // Template
  const itemRenderer = (item: IItem, options: IMenuOption): ReactNode => {
    const container_color = pathname.includes(item?.route ?? '')
      ? '#b1c748'
      : '#fff';

    const color = pathname.includes(item?.route ?? '') ? 'white' : '';

    return (
      <div
        className={`flex justify-between items-center px-2 py-2 cursor-pointer bg-[${container_color}] rounded-xl`}
        onClick={options.onClick}
      >
        <div className="flex items-center gap-x-2 text-sm">
          {item.icon && <FontAwesomeIcon icon={item.icon} color={color} />}

          <span className={`text-${color}`}>{item.label}</span>
        </div>

        {item.isExpandable && (
          <FontAwesomeIcon
            icon={options.active ? faChevronUp : faChevronDown}
            color={color}
          />
        )}
      </div>
    );
  };

  const items: IPanelItem[] = [
    {
      label: 'My Website',
      route: 'www.abc.com',
      template: itemRenderer,
      isExpandable: false,
      isParent: true,
      items: [],
      icon: faUpRightFromSquare,
    },

    {
      label: 'Home',
      route: '/home',
      template: itemRenderer,
      isExpandable: false,
      isParent: true,
      icon: faHome,
      items: [],
    },

    {
      label: 'General',
      route: '/general',
      template: itemRenderer,
      isExpandable: true,
      isParent: true,
      icon: faCog,
      items: [
        {
          label: 'Vendors',
          route: '/vendors',
          template: itemRenderer,
          isParent: false,
        },
        {
          label: 'Restaurants',
          route: '/restaurants',
          template: itemRenderer,
          isParent: false,
        },
        {
          label: 'Riders',
          route: '/riders',
          template: itemRenderer,
          isParent: false,
        },
        {
          label: 'Users',
          route: '/users',
          template: itemRenderer,
          isParent: false,
        },
      ],
    },
    {
      label: 'Management',
      route: '/management',
      template: itemRenderer,
      isExpandable: true,
      isParent: true,
      icon: faSliders,
      items: [
        {
          label: 'Configuration',
          route: '/configuration',
          template: itemRenderer,
          isParent: false,
        },
        {
          label: 'Coupons',
          route: '/coupons',
          template: itemRenderer,
          isParent: false,
        },
        {
          label: 'Cousins',
          route: '/cuisines',
          template: itemRenderer,
          isParent: false,
        },
        {
          label: 'Banners',
          route: '/banners',
          template: itemRenderer,
          isParent: false,
        },
        {
          label: 'Tipping',
          route: '/tipping',
          template: itemRenderer,
          isParent: false,
        },
        {
          label: 'Commission Rate',
          route: '/commission-rate',
          template: itemRenderer,
          isParent: false,
        },
        {
          label: 'Withdraw Request',
          route: '/withdraw-request',
          template: itemRenderer,
          isParent: false,
        },
        {
          label: 'Notification',
          route: '/notifications',
          template: itemRenderer,
          isParent: false,
        },
      ],
    },
  ];

  // Use Effects
  useEffect(() => {
    // document.addEventListener('mousedown', handleClickOutside);
    // return () => {
    //   document.removeEventListener('mousedown', handleClickOutside);
    // };
  }, []);

  return (
    <div
      id="my-screen"
      className={`bg-white overflow-auto w-64 h-full p-4 border-r fixed lg:relative z-50 transform ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} transition-transform duration-300 ease-in-out`}
      ref={containerRef}
    >
      <PanelMenu
        model={items}
        className={`${classes['custom-panel-menu']} w-full`}
      />
    </div>
  );
}
