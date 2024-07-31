// Styles
import MainLayout from '@/lib/ui/layouts/unprotected/main/';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
