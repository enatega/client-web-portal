'use client';

import { VendorLayoutProvider } from '@/lib/context/vendor/layout-vendor.context';
import VendorLayout from '@/lib/ui/layouts/protected/vendor';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <VendorLayoutProvider>
      {' '}
      {/* VendorLayoutProvider for context */}
      <VendorLayout>{children}</VendorLayout> {/* UI Layout for Vendor */}
    </VendorLayoutProvider>
  );
}
