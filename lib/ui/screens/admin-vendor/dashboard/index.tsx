'use client';

// Component
import GrowthOverView from '@/lib/ui/screen-components/protected/restaurant(vendor)/dashboard/growth-overview';
import OrderStats from '@/lib/ui/screen-components/protected/restaurant(vendor)/dashboard/order-stats';
import RestaurantStatesTable from '@/lib/ui/screen-components/protected/restaurant(vendor)/dashboard/restaurant-stats-table';

export default function AdminVendorDashboard() {
  return (
    <div className="h-[calc(100vh-2rem)] w-full space-y-6 overflow-y-auto p-4 pb-8">
      <OrderStats />
      <GrowthOverView />
      <RestaurantStatesTable />
    </div>
  );
}
