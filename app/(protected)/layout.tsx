// Layout
import ProtectedMainLayout from '@/lib/ui/layouts/protected/main/';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedMainLayout>{children}</ProtectedMainLayout>;
}
