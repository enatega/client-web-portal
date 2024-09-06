// Core
import { usePathname } from 'next/navigation';
import { ReactNode, useContext, useRef } from 'react';

// Prime React
import { PanelMenu } from 'primereact/panelmenu';

// Context
import { LayoutContext } from '@/lib/context/layout-context';

// Interface and Types
import { LayoutContextProps, SidebarContextProps } from '@/lib/utils/types';

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
import { SidebarContext } from '@/lib/context/sidebar-context';
import { IItem, IMenuOption, IPanelItem } from '@/lib/utils/interfaces';
import Link from 'next/link';
import classes from './side-bar.module.css';

export default function Sidebar() {
  // Context
  const { isSidebarVisible /* showSidebar */ } =
    useContext<LayoutContextProps>(LayoutContext);
  // Ref
  const containerRef = useRef<HTMLDivElement>(null);
  // Router
  const pathname = usePathname();

  // Context
  const { setSidebarExpandedItemKeys } =
    useContext<SidebarContextProps>(SidebarContext);

  // Template
  const itemRenderer = (item: IItem, options: IMenuOption): ReactNode => {
    const _container_color = pathname.includes(item?.route ?? '')
      ? item.isParent
        ? 'sb-item-primary-color'
        : 'sb-item-secondary-color'
      : '#fff';

    const _color = pathname.includes(item?.route ?? '') ? 'white' : '';

    if (item?.route === '/home') console.log({ route: item?.route });

    return (
      <Link href={item?.route ?? '/'}>
        <div
          className={`flex justify-between items-center px-2 py-2 cursor-pointer bg-${_container_color} rounded-xl`}
          onClick={options.onClick}
        >
          <div className="flex items-center gap-x-2 text-sm">
            {item.icon && <FontAwesomeIcon icon={item.icon} color={_color} />}

            <span className={`text-${_color}`}>{item.label}</span>
          </div>

          {item.isExpandable && (
            <FontAwesomeIcon
              icon={options.active ? faChevronUp : faChevronDown}
              color={_color}
            />
          )}
        </div>
      </Link>
    );
  };

  const staticItemRenderer = (item: IPanelItem): ReactNode => {
    const _container_color = pathname.includes(item?.route ?? '')
      ? item.isParent
        ? 'sb-item-primary-color'
        : 'sb-item-secondary-color'
      : '#fff';

    const _color = pathname.includes(item?.route ?? '')
      ? 'text-white'
      : 'text-[#71717a]';

    const _icon_color = pathname.includes(item?.route ?? '')
      ? 'white'
      : '#71717a';

    return (
      <Link key={item.key} href={item?.route ?? '/'}>
        <div
          className={`flex justify-between items-center px-2 py-2 cursor-pointer bg-${_container_color} rounded-xl`}
        >
          <div className="flex items-center gap-x-2 text-sm">
            {item.icon && (
              <FontAwesomeIcon icon={item.icon} color={_icon_color} />
            )}

            <span className={_color}>{item.label}</span>
          </div>
        </div>
      </Link>
    );
  };

  const items: IPanelItem[] = [
    {
      key: '2',
      label: 'General',
      route: '/general',
      template: itemRenderer,
      isExpandable: true,
      isParent: true,
      icon: faCog,
      items: [
        {
          key: '2_0',
          label: 'Vendors',
          route: '/general/vendors',
          template: itemRenderer,
          isParent: false,
        },
        {
          key: '2_1',
          label: 'Restaurants',
          route: '/general/restaurants',
          template: itemRenderer,
          isParent: false,
        },
        {
          key: '2_2',
          label: 'Riders',
          route: '/general/riders',
          template: itemRenderer,
          isParent: false,
        },
        {
          key: '2_3',
          label: 'Users',
          route: '/general/users',
          template: itemRenderer,
          isParent: false,
        },
      ],
    },
    {
      key: '3',
      label: 'Management',
      route: '/management',
      template: itemRenderer,
      isExpandable: true,
      isParent: true,
      icon: faSliders,
      items: [
        {
          key: '3_0',
          label: 'Configuration',
          route: '/management/configurations',
          template: itemRenderer,
          isParent: false,
        },
        {
          key: '3_1',
          label: 'Coupons',
          route: '/management/coupons',
          template: itemRenderer,
          isParent: false,
        },
        {
          key: '3_2',
          label: 'Cousins',
          route: '/management/cuisines',
          template: itemRenderer,
          isParent: false,
        },
        {
          key: '3_3',
          label: 'Banners',
          route: '/management/banners',
          template: itemRenderer,
          isParent: false,
        },
        {
          key: '3_4',
          label: 'Tipping',
          route: '/management/tippings',
          template: itemRenderer,
          isParent: false,
        },
        {
          key: '3_5',
          label: 'Commission Rate',
          route: '/management/commission-rates',
          template: itemRenderer,
          isParent: false,
        },
        {
          key: '3_6',
          label: 'Withdraw Request',
          route: '/management/withdraw-requests',
          template: itemRenderer,
          isParent: false,
        },
        {
          key: '3_7',
          label: 'Notification',
          route: '/management/notifications',
          template: itemRenderer,
          isParent: false,
        },
      ],
    },
  ];
  const static_items: IPanelItem[] = [
    {
      key: '0',
      label: 'My Website',
      route: 'www.abc.com',
      template: itemRenderer,
      isExpandable: false,
      isParent: true,
      icon: faUpRightFromSquare,
    },

    {
      key: '1',
      label: 'Home',
      route: '/home',
      template: itemRenderer,
      isExpandable: false,
      isParent: true,
      icon: faHome,
      // items: [],
    },
  ];

  return (
    <div
      id="my-screen"
      className={`flex flex-col bg-white overflow-auto w-64 h-full p-4 border-r fixed lg:relative z-50 transform ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} transition-transform duration-300 ease-in-out`}
      ref={containerRef}
    >
      {static_items.map(staticItemRenderer)}

      <PanelMenu
        className={`${classes['custom-panel-menu']} w-full`}
        model={items}
        onExpandedKeysChange={setSidebarExpandedItemKeys}
      />
    </div>
  );
}
