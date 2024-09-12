// Core
import type { Metadata } from 'next';

// Font
import { Inter } from 'next/font/google';

// Prime React
import { PrimeReactProvider } from 'primereact/api';

// Context
import { LayoutProvider } from '@/lib/context/layout-context';

// Configuration
import { FontawesomeConfig } from '@/lib/config';

// Context
import { RestaurantProvider } from '@/lib/context/restaurant-context';
import { SidebarProvider } from '@/lib/context/sidebar-context';
import { VendorProvider } from '@/lib/context/vendor-context';

// Styles
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Enatega',
  description: 'Order Food Now!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        {/* <ApolloProvider client={null}> */}
        <PrimeReactProvider value={value}>
          <LayoutProvider>
            <SidebarProvider>
              <VendorProvider>
                <RestaurantProvider>{children}</RestaurantProvider>
              </VendorProvider>
            </SidebarProvider>
          </LayoutProvider>
        </PrimeReactProvider>
        {/* </ApolloProvider> */}
      </body>
    </html>
  );
}
