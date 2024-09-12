'use client';

// Core
import QueryProvidor from '@/app/providors/QueryProvidor';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createContext, useState } from 'react';

// Interface
import { IProvider } from '@/lib/utils/interfaces';

// Types
import { LayoutContextProps } from '@/lib/utils/interfaces';

export const LayoutContext = createContext({} as LayoutContextProps);

export const LayoutProvider = ({ children }: IProvider) => {
  const [isSidebarVisible, setShowSidebar] = useState<boolean>(true);
  const [isAdminSidebarVisible, setAdminShowSidebar] = useState<boolean>(true);

  const onShowSidebarHandler = (val?: boolean) => {
    setShowSidebar((prevState) => (val === undefined ? !prevState : val));
  };

  const onShowAdminSidebarHandler = (val?: boolean) => {
    setAdminShowSidebar((prevState) => (val === undefined ? !prevState : val));
  };

  const value: LayoutContextProps = {
    isSidebarVisible: isSidebarVisible,
    showSidebar: onShowSidebarHandler,
    isAdminSidebarVisible,
    showAdminSidebar: onShowAdminSidebarHandler,
  };
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_BASE_URL}/graphql`,
    cache: new InMemoryCache(),
  });
  return (
    <LayoutContext.Provider value={value}>
      <ApolloProvider client={client}>
        <QueryProvidor>{children}</QueryProvidor>
      </ApolloProvider>
    </LayoutContext.Provider>
  );
};
