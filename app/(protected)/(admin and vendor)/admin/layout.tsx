// Layout
import RestaurantLayout from '@/lib/ui/layouts/protected/restaurant';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RestaurantLayout>{children}</RestaurantLayout>;
}
