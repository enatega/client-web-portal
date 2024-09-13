'use client';

// Core
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

// Context
import { SidebarContext } from '@/lib/context/sidebar.context';

// Interface & Types
import { ISidebarContextProps } from '@/lib/utils/interfaces';

export default function RootPage() {
  // Context
  const { setSelectedItem } = useContext<ISidebarContextProps>(SidebarContext);

  // Hooks
  const router = useRouter();

  // Effects
  useEffect(() => {
    setSelectedItem({ screenName: 'Home' });
    router.replace('/home');
  }, []);

  return <></>;
}
