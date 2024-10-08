/* eslint-disable @next/next/no-img-element */

'use client';

// Core
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

// Icons
import {
  faBars,
  faBell,
  faChevronDown,
  faCog,
  faEllipsisV,
  faGlobe,
  faMap,
  faTruck,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

// UI Components
import { Avatar } from 'primereact/avatar';

// Prime Reat
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';

// Layout
import { LayoutContext } from '@/lib/context/global/layout.context';

// Hooks
import { useUserContext } from '@/lib/hooks/useUser';

// Interface/Types
import { LayoutContextProps } from '@/lib/utils/interfaces';

// Constants
import {
  APP_NAME,
  DISPATCH,
  LANGUAGE,
  SELECTED_RESTAURANT,
  SELECTED_VENDOR,
  SELECTED_VENDOR_EMAIL,
  SETTINGS,
  ZONE,
} from '@/lib/utils/constants';

// Methods
import { onUseLocalStorage, toTextCase } from '@/lib/utils/methods';

// Styles
import classes from './app-bar.module.css';

const AppTopbar = () => {
  // States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Ref
  const containerRef = useRef<HTMLDivElement>(null);
  // Context
  const { showSuperAdminSidebar } =
    useContext<LayoutContextProps>(LayoutContext);
  const { setUser } = useUserContext();
  // Hooks
  const pathname = usePathname();
  const router = useRouter();

  // Handlers
  const onDevicePixelRatioChange = useCallback(() => {
    setIsMenuOpen(false);
    showSuperAdminSidebar(false);
  }, [showSuperAdminSidebar]);

  const handleClickOutside = (event: MouseEvent) => {
    // Check if the clicked target is outside the container
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false); // Close the container or handle the click outside
    }
  };

  const onRedirectToPage = (_route: string) => {
    router.push(_route);
  };

  const onLogout = () => {
    setUser(null);
    onUseLocalStorage('delete', SELECTED_VENDOR);
    onUseLocalStorage('delete', SELECTED_VENDOR_EMAIL);
    onUseLocalStorage('delete', SELECTED_RESTAURANT);
    onUseLocalStorage('delete', `user-${APP_NAME}`);
    router.push('/authentication/login');
  };

  // Use Effects
  useEffect(() => {
    // Listening to mouse down event
    document.addEventListener('mousedown', handleClickOutside);

    // Listen to window resize events
    window.addEventListener('resize', onDevicePixelRatioChange);

    return () => {
      // Cleanup listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', onDevicePixelRatioChange);
    };
  }, [onDevicePixelRatioChange]);

  return (
    <div className={`${classes['layout-topbar']}`}>
      <div className="flex items-center gap-x-3">
        <div id="sidebar-opening-icon">
          <button onClick={() => showSuperAdminSidebar()}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <div className="flex items-center bg-black p-2 px-3 text-white">
          <span className="text-xl font-bold">H</span>
        </div>
        <span className="ml-2 text-lg font-semibold">
          {toTextCase(APP_NAME, 'upper')}
        </span>
      </div>
      <div className="hidden items-center space-x-5 md:flex">
        <TextIconClickable
          icon={faMap}
          title={ZONE}
          className={
            pathname === '/zone'
              ? 'rounded bg-primary-color text-white'
              : 'bg-transparent hover:rounded hover:bg-secondary-color'
          }
          iconStyles={{
            color: pathname === '/zone' ? 'white' : 'gray',
          }}
          onClick={() => onRedirectToPage('/zone')}
        />
        <TextIconClickable
          icon={faTruck}
          title={DISPATCH}
          className={
            pathname === '/dispatch'
              ? 'rounded bg-primary-color text-white'
              : 'bg-transparent hover:rounded hover:bg-secondary-color'
          }
          iconStyles={{ color: pathname === '/dispatch' ? 'white' : 'gray' }}
          onClick={() => onRedirectToPage('/dispatch')}
        />
        <TextIconClickable
          icon={faCog}
          title={SETTINGS}
          className={
            pathname === '/settings'
              ? 'rounded bg-primary-color text-white'
              : 'bg-transparent hover:rounded hover:bg-secondary-color'
          }
          iconStyles={{ color: pathname === '/settings' ? 'white' : 'gray' }}
          onClick={() => onRedirectToPage('/settings')}
        />
        <TextIconClickable
          icon={faChevronDown}
          title={LANGUAGE}
          className={
            pathname === '/language'
              ? 'rounded bg-primary-color text-white'
              : 'bg-transparent hover:rounded hover:bg-secondary-color'
          }
          iconStyles={{ color: pathname === '/language' ? 'white' : 'gray' }}
          onClick={() => onRedirectToPage('/language')}
        />

        <FontAwesomeIcon className="cursor-pointer" icon={faBell} />
        <div className="flex items-center space-x-1">
          <Avatar
            label="V"
            size="normal"
            style={{ backgroundColor: '#2196F3', color: '#ffffff' }}
            shape="circle"
          />

          <FontAwesomeIcon icon={faChevronDown} />
        </div>
        <FontAwesomeIcon
          onClick={onLogout}
          className="cursor-pointer"
          icon={faRightFromBracket}
        />
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </div>
      {isMenuOpen && (
        <div
          className="absolute right-4 top-8 z-50 rounded-lg bg-white p-4 shadow-lg"
          ref={containerRef}
        >
          <div className="flex flex-col items-center space-y-4">
            <Avatar
              label="V"
              size="normal"
              style={{ backgroundColor: '#2196F3', color: '#ffffff' }}
              shape="circle"
            />
            <FontAwesomeIcon icon={faBell} color="gray" />
            <TextIconClickable className="justify-between" icon={faMap} />
            <TextIconClickable className="justify-between" icon={faTruck} />
            <TextIconClickable className="justify-between" icon={faCog} />
            <TextIconClickable className="justify-between" icon={faGlobe} />
            <TextIconClickable
              onClick={onLogout}
              className="cursor-pointer"
              icon={faRightFromBracket}
            />
          </div>
        </div>
      )}
    </div>
  );
};

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
