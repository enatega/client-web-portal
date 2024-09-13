'use client';

// Core
import { ApolloProvider } from '@apollo/client';

// Font
import { Inter } from 'next/font/google';

// Prime React
import { PrimeReactProvider } from 'primereact/api';

// Providers
import { LayoutProvider } from '@/lib/context/layout.context';
import { SidebarProvider } from '@/lib/context/sidebar.context';

// Service

// Configuration
import { FontawesomeConfig } from '@/lib/config';

// Styles
import { ConfigurationProvider } from '@/lib/context/configuration.context';
import { useSetupApollo } from '@/lib/hooks/useSetApollo';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Apollo
  const client = useSetupApollo();

  // Constants
  const value = {
    ripple: true,
  };

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <FontawesomeConfig />
      </head>
      <body className={inter.className}>
        <PrimeReactProvider value={value}>
          <ApolloProvider client={client}>
            <ConfigurationProvider>
              <LayoutProvider>
                <SidebarProvider>{children}</SidebarProvider>
              </LayoutProvider>
            </ConfigurationProvider>
          </ApolloProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
