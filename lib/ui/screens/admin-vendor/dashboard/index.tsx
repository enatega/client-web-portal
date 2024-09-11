'use client';

import GrowthOverView from '@/lib/ui/screen-components/protected/restaurant/dashboard/growth-overview';
import UserStats from '@/lib/ui/screen-components/protected/restaurant/dashboard/user-stats';

export default function AdminVendorDashboard() {
  return (
    <div className="space-y-6 w-full p-4 h-[calc(100vh-2rem)] overflow-y-auto pb-8">
      <UserStats />
      <GrowthOverView />
    </div>
  );
}
