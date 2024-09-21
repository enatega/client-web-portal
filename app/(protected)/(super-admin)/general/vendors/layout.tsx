'use client';

import { RestaurantProvider } from '@/lib/context/restaurant.context';
import { VendorProvider } from '@/lib/context/vendor.context';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <VendorProvider>
      <RestaurantProvider>{children}</RestaurantProvider>
    </VendorProvider>
  );
}
