'use client';

// Component
import GrowthOverView from '@/lib/ui/screen-components/protected/home/growth-overview';
import UserStats from '@/lib/ui/screen-components/protected/home/user-stats';

export default function Home() {
  return (
    <div className="h-[calc(100vh-2rem)] w-full space-y-6 overflow-y-auto p-4 pb-8">
      <UserStats />
      <GrowthOverView />
    </div>
  );
}
