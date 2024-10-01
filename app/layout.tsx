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
import { UserProvider } from '@/lib/context/user-context';

// Service

// Configuration
import { FontawesomeConfig } from '@/lib/config';

// Styles
import { ConfigurationProvider } from '@/lib/context/configuration.context';
import { ToastProvider } from '@/lib/context/toast.context';
import { useSetupApollo } from '@/lib/hooks/useSetApollo';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import './global.css';
import withPermissionsGuard from '@/lib/ui/guards/PermissionsGuard';
const inter = Inter({ subsets: ['latin'] });

const ProtectedLayout = withPermissionsGuard(
  ({ children }: { children: React.ReactNode }) => {
    return (
      <LayoutProvider>
        <SidebarProvider>
          <ToastProvider>{children}</ToastProvider>
        </SidebarProvider>
      </LayoutProvider>
    );
  }
);

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
              <UserProvider>
                <ProtectedLayout>{children}</ProtectedLayout>
              </UserProvider>
            </ConfigurationProvider>
          </ApolloProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
