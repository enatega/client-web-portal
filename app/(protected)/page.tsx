'use client';

import { SidebarContext } from '@/lib/context/sidebar-context';
import { ISidebarContextProps } from '@/lib/utils/types';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function RootPage() {
  // Context
  const { setSelectedItem } = useContext<ISidebarContextProps>(SidebarContext);
  // Router
  const router = useRouter();

  useEffect(() => {
    setSelectedItem({ screenName: 'Home' });
    router.replace('/home');
  }, []);

  return <></>;
}
