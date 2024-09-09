/* eslint-disable react-hooks/exhaustive-deps */
'use client';

// Components

// Interface
import { ILayoutProvider } from '@/lib/utils/interfaces';

const HomeLayout = ({ children }: ILayoutProvider) => {
  return <div className="h-full overflow-auto">{children}</div>;
};

export default HomeLayout;
