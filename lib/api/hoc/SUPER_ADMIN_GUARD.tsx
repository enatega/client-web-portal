'use client';
import { useUserContext } from '@/lib/hooks/useUser';
import { ROUTES } from '@/lib/utils/constants/routes';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const SUPER_ADMIN_GUARD = <T extends object>(
  Component: React.ComponentType<T>
) => {
  const WrappedComponent = (props: T) => {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useUserContext();

    useEffect(() => {
      // To find the name of path as per saved in db i.e /management/commission-rates => Commision Rates
      const findRouteName = ROUTES.find((v) => v.route === pathname);

      // For Staff
      if (
        user &&
        user.userType === 'STAFF' &&
        findRouteName &&
        Array.isArray(user.permissions)
      ) {
        const allowed = user?.permissions?.includes(findRouteName?.text);

        if (!allowed) {
          router.replace('/forbidden');
        }
      }

      // For Others
      if (user?.userType === 'RESTAURANT' || user?.userType === 'VENDOR') {
        router.replace('/forbidden');
      }
    }, []);

    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default SUPER_ADMIN_GUARD;
