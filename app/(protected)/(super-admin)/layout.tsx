// Layout
import SuperAdminLayout from '@/lib/ui/layouts/protected/super-admin';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SuperAdminLayout>{children}</SuperAdminLayout>;
}
