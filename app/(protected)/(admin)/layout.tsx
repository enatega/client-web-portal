import HomeLayoutProvider from '@/lib/ui/layouts/protected/home';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <HomeLayoutProvider>{children}</HomeLayoutProvider>;
}
