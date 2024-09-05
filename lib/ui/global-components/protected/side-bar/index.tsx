// Core
import { useContext, useEffect, useRef } from 'react';

// Context
import { LayoutContext } from '@/lib/context/layout-context';

// Interface and Types
import { LayoutContextProps } from '@/lib/utils/types';

export default function Sidebar() {
  // Context
  const { isSidebarVisible, showSidebar } =
    useContext<LayoutContextProps>(LayoutContext);
  // Ref
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    // Check if the clicked target is outside the container
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      showSidebar(false); // Close the container or handle the click outside
    }
  };

  // Use Effects
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`bg-white w-64 h-screen p-4 border-r fixed lg:relative z-50 transform ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} transition-transform duration-300 ease-in-out`}
      ref={containerRef}
    >
      <ul>
        <li className="mb-4">
          <a
            href="#"
            className="flex items-center text-black bg-lime-200 p-2 rounded"
          >
            <i className="fas fa-tachometer-alt mr-2"></i>
            Dashboard
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="flex items-center text-gray-600 p-2 rounded">
            <i className="fas fa-user mr-2"></i>
            Profile
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="flex items-center text-gray-600 p-2 rounded">
            <i className="fas fa-box mr-2"></i>
            Product Management
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="flex items-center text-gray-600 p-2 rounded">
            <i className="fas fa-cog mr-2"></i>
            Store Setting
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="flex items-center text-gray-600 p-2 rounded">
            <i className="fas fa-wallet mr-2"></i>
            Wallet
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="flex items-center text-gray-600 p-2 rounded">
            <i className="fas fa-credit-card mr-2"></i>
            Subscription
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="flex items-center text-gray-600 p-2 rounded">
            <i className="fas fa-shopping-cart mr-2"></i>
            Orders
          </a>
        </li>
      </ul>
    </div>
  );
}
