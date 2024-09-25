'use client';

import { RestaurantLayoutProvider } from '@/lib/context/layout-restaurant.context';
// Layout
import RestaurantLayout from '@/lib/ui/layouts/protected/restaurant';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RestaurantLayoutProvider>
      <RestaurantLayout>{children}</RestaurantLayout>
    </RestaurantLayoutProvider>
  );
}
