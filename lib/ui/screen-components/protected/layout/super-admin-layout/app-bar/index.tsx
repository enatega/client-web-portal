/* eslint-disable @next/next/no-img-element */

'use client';

// Core
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
} from '@fortawesome/free-solid-svg-icons';

// UI Components
import { Avatar } from 'primereact/avatar';

// Prime Reat
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';

// Layout
import { LayoutContext } from '@/lib/context/layout.context';

// Interface/Types
import { LayoutContextProps } from '@/lib/utils/interfaces';

import { APP_NAME, DISPATCH, LANGUAGE, ZONE } from '@/lib/utils/constants';

// Methods
import { toTextCase } from '@/lib/utils/methods';

// Styles
import classes from './app-bar.module.css';

const AppTopbar = () => {
  // States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Ref
  const containerRef = useRef<HTMLDivElement>(null);
  // Context
  const { showSidebar } = useContext<LayoutContextProps>(LayoutContext);

  // Handlers
  const onDevicePixelRatioChange = useCallback(() => {
    setIsMenuOpen(false);
    showSidebar(false);
  }, [showSidebar]);

  const handleClickOutside = (event: MouseEvent) => {
    // Check if the clicked target is outside the container
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false); // Close the container or handle the click outside
    }
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
        <div>
          <button onClick={() => showSidebar()}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <div className="flex items-center bg-black text-white p-2 px-3">
          <span className="text-xl font-bold">H</span>
        </div>
        <span className="ml-2 text-lg font-semibold">
          {toTextCase(APP_NAME, 'upper')}
        </span>
      </div>
      <div className="hidden md:flex items-center space-x-6">
        <TextIconClickable icon={faMap} title={ZONE} />
        <TextIconClickable icon={faTruck} title={DISPATCH} />
        <TextIconClickable icon={faCog} title={DISPATCH} />
        <TextIconClickable icon={faChevronDown} title={LANGUAGE} />

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
      </div>
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </div>
      {isMenuOpen && (
        <div
          className="absolute top-8 right-4 bg-white shadow-lg rounded-lg p-4 z-50"
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
          </div>
        </div>
      )}
    </div>
  );
};

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
