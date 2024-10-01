'use client';
import { useUserContext } from '@/lib/hooks/useUser';
import { ROUTES } from '@/lib/utils/constants/routes';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';

const withPermissionsGuard = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WrappedComponent = (props: P) => {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useUserContext();

    // To find the name of path as per saved in db i.e /management/commission-rates => Commision Rates
    const findRouteName = ROUTES.find((v) => v.route === pathname);

    if (
      user &&
      user.userType === 'STAFF' &&
      findRouteName &&
      Array.isArray(user.permissions)
    ) {
      const allowed = user?.permissions?.includes(findRouteName?.text);

      if (!allowed) {
        router.push('/not-allowed');
        return null;
      }
    }

    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default withPermissionsGuard;
