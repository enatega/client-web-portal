/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import HomeHeader from '@/lib/ui/screens/home/header';
// Components

// Interface
import { ILayoutProvider } from '@/lib/utils/interfaces';

const HomeLayout = ({ children }: ILayoutProvider) => {
  return (
    <>
      <div className="">
        <HomeHeader />
      </div>
      <div className="">{children}</div>
    </>
  );
};

export default HomeLayout;
