'use client';
import { useUserContext } from '@/lib/hooks/useUser';
import { useRouter } from 'next/navigation';
import React from 'react';

const VENDOR_GUARD = <T extends object>(Component: React.ComponentType<T>) => {
  const WrappedComponent = (props: T) => {
    const router = useRouter();
    const { user } = useUserContext();

    // For Staff => Check if VENDOR permission is given to staff
    if (user && user.userType === 'STAFF') {
      const allowed = user?.permissions?.includes('Vendors');

      if (!allowed) {
        router.replace('/forbidden');
        return null;
      }
    }

    // For Restaurant
    if (user?.userType === 'RESTAURANT') {
      router.replace('/forbidden');
    }

    // ADMIN/VENDOR is always allowed
    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default VENDOR_GUARD;
