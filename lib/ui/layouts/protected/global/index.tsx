/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { ApolloClientConfig } from '@/lib/utils/constants/global';
// Interface
import { IProvider } from '@/lib/utils/interfaces';
import { ApolloProvider } from '@apollo/client';

const RootLayout = ({ children }: IProvider) => {
  return (
    <div className="h-full">
      <ApolloProvider client={ApolloClientConfig}>{children}</ApolloProvider>
    </div>
  );
};

export default RootLayout;
