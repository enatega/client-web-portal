'use client';

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

// Prime React

// Context

// Interface and Types

// Icons

// Context

// Interface

// Styles

//export function Sidebar() {
// Context
// const { isSidebarVisible /* showSidebar */ } =
//   useContext<LayoutContextProps>(LayoutContext);
// // Ref
// const containerRef = useRef<HTMLDivElement>(null);
// // Router
// const pathname = usePathname();
// const router = useRouter();

// // Context
// const { selectedItem, setSelectedItem } =
//   useContext<ISidebarContextProps>(SidebarContext);

// // Template
// const itemRenderer = (item: IItem, options: IMenuOption): ReactNode => {
//   const _container_color = pathname.includes(item?.route ?? '')
//     ? item.isParent
//       ? 'var(--primary-color)'
//       : 'var(--secondary-color)'
//     : '#fff';

//   const _color = pathname.includes(item?.route ?? '') ? 'white' : '';

//   return (
//     <div
//       onClick={() => {
//         router.push(item?.route ?? '/');

//         setSelectedItem({
//           screenName: item?.label ?? '',
//         } as ISelectedItems);
//       }}
//     >
//       <div
//         className="flex justify-between items-center px-2 py-2 cursor-pointer rounded-xl"
//         style={{ backgroundColor: _container_color }}
//         onClick={options.onClick}
//       >
//         <div className="flex items-center gap-x-2 text-sm">
//           {item.icon && <FontAwesomeIcon icon={item.icon} color={_color} />}

//           <span className={`text-${_color}`}>{item.label}</span>
//         </div>

//         {item.isExpandable && (
//           <FontAwesomeIcon
//             icon={options.active ? faChevronUp : faChevronDown}
//             color={_color}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// const staticItemRenderer = (item: IPanelItem): ReactNode => {
//   const _container_color = pathname.includes(item?.route ?? '')
//     ? item.isParent
//       ? 'var(--primary-color)' //'sb-item-primary-color'
//       : 'var(--secondary-color)' //'sb-item-secondary-color'
//     : '#fff';

//   const _color = pathname.includes(item?.route ?? '')
//     ? 'text-white'
//     : 'text-[#71717a]';

//   const _icon_color = pathname.includes(item?.route ?? '')
//     ? 'white'
//     : '#71717a';

//   return (
//     <div
//       key={item.key}
//       onClick={() => {
//         router.push(item?.route ?? '/');

//         setSelectedItem({
//           ...selectedItem,
//           screenName: item?.label ?? '',
//         } as ISelectedItems);
//       }}
//     >
//       <div
//         className="flex justify-between items-center px-2 py-2 cursor-pointer rounded-xl"
//         style={{ backgroundColor: _container_color }}
//       >
//         <div className="flex items-center gap-x-2 text-sm">
//           {item.icon && (
//             <FontAwesomeIcon icon={item.icon} color={_icon_color} />
//           )}

//           <span className={_color}>{item.label}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// const items: IPanelItem[] = [
// {
//   key: '2',
//   label: 'General',
//   route: '/general',
//   template: itemRenderer,
//   isExpandable: true,
//   isParent: true,
//   icon: faCog,
//   items: [
//     {
//       key: '2_0',
//       label: 'Vendors',
//       route: '/general/vendors',
//       template: itemRenderer,
//       isParent: false,
//     },
//     {
//       key: '2_1',
//       label: 'Restaurants',
//       route: '/general/restaurants',
//       template: itemRenderer,
//       isParent: false,
//     },
//     {
//       key: '2_2',
//       label: 'Riders',
//       route: '/general/riders',
//       template: itemRenderer,
//       isParent: false,
//     },
//     {
//       key: '2_3',
//       label: 'Users',
//       route: '/general/users',
//       template: itemRenderer,
//       isParent: false,
//     },
//   ],
// },
// {
//   key: '3',
//   label: 'Management',
//   route: '/management',
//   template: itemRenderer,
//   isExpandable: true,
//   isParent: true,
//   icon: faSliders,
//   items: [
//     {
//       key: '3_0',
//       label: 'Configuration',
//       route: '/management/configurations',
//       template: itemRenderer,
//       isParent: false,
//     },
//     {
//       key: '3_1',
//       label: 'Coupons',
//       route: '/management/coupons',
//       template: itemRenderer,
//       isParent: false,
//     },
//     {
//       key: '3_2',
//       label: 'Cousins',
//       route: '/management/cuisines',
//       template: itemRenderer,
//       isParent: false,
//     },
//     {
//       key: '3_3',
//       label: 'Banners',
//       route: '/management/banners',
//       template: itemRenderer,
//       isParent: false,
//     },
//     {
//       key: '3_4',
//       label: 'Tipping',
//       route: '/management/tippings',
//       template: itemRenderer,
//       isParent: false,
//     },
//     {
//       key: '3_5',
//       label: 'Commission Rate',
//       route: '/management/commission-rates',
//       template: itemRenderer,
//       isParent: false,
//     },
//     {
//       key: '3_6',
//       label: 'Withdraw Request',
//       route: '/management/withdraw-requests',
//       template: itemRenderer,
//       isParent: false,
//     },
//     {
//       key: '3_7',
//       label: 'Notification',
//       route: '/management/notifications',
//       template: itemRenderer,
//       isParent: false,
//     },
//   ],
// },
// ];
// const static_items: IPanelItem[] = [
//   {
//     key: '0',
//     label: 'My Website',
//     route: 'www.abc.com',
//     template: itemRenderer,
//     isExpandable: false,
//     isParent: true,
//     icon: faUpRightFromSquare,
//   },

//   {
//     key: '1',
//     label: 'Home',
//     route: '/home',
//     template: itemRenderer,
//     isExpandable: false,
//     isParent: true,
//     icon: faHome,
//     // items: [],
//   },
// ];

// This sidebar component is for both mobile and desktop
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
    // {
    //   icon: faHome,
    //   text: 'My Website',
    //   active: true,
    // },
    // {
    //   icon: faHome,
    //   text: 'Home',
    //   active: true,
    // },
    // {
    //   icon: faUser,
    //   text: 'General',
    //   subMenu: [
    //     {
    //       text: 'Vendor',
    //     },
    //     {
    //       text: 'Restaurants',
    //     },
    //     {
    //       text: 'Riders',
    //     },
    //     {
    //       text: 'Users',
    //     },
    //   ],
    // },
    // {
    //   icon: faUser,
    //   text: 'Management',
    //   subMenu: [
    //     {
    //       text: 'Configuration',
    //     },
    //     {
    //       text: 'Coupons',
    //     },
    //     {
    //       text: 'Cuisines',
    //     },
    //     {
    //       text: 'Tipping',
    //     },
    //     {
    //       text: 'Commission Rate',
    //     },
    //     {
    //       text: 'Withdraw Request',
    //     },
    //     {
    //       text: 'Notification',
    //     },
    //   ],
    // },
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

/*  return (
    <div
      id="my-screen"
      className={`flex flex-col bg-white overflow-auto w-64 h-full p-4 border-r fixed lg:relative z-50 transform ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} transition-transform duration-300 ease-in-out`}
      ref={containerRef}
    >
      {static_items.map(staticItemRenderer)}

      <PanelMenu
        className={`${classes['custom-panel-menu']} w-full`}
        model={items}
      />
    </div>
  ); */
