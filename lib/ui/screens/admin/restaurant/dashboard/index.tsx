'use client';

import DashboardDateFilter from '@/lib/ui/screen-components/protected/restaurant/dashboard/date-filter';
// Component
import GrowthOverView from '@/lib/ui/screen-components/protected/restaurant/dashboard/growth-overview';
import OrderStats from '@/lib/ui/screen-components/protected/restaurant/dashboard/order-stats';
import RestaurantStatesTable from '@/lib/ui/screen-components/protected/restaurant/dashboard/restaurant-stats-table';
import { useState } from 'react';

<<<<<<< HEAD:lib/ui/screens/admin/restaurant/dashboard/index.tsx
export default function AdminRestaurantDashboard() {
=======
export default function AdminVendorDashboard() {
>>>>>>> 6b25c7e89c5a0002f082a391dcbbc51dbd9daaba:lib/ui/screens/admin-vendor/dashboard/index.tsx
  const [dateFilter, setDateFilter] = useState({
    startDate: `${new Date().getFullYear()}-01-01`, // Current year, January 1st
    endDate: `${new Date().getFullYear()}-${String(new Date().getMonth()).padStart(2, '0')}-${String(new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate()).padStart(2, '0')}`, // Last day of previous month
  });

  return (
    <div className="screen-container">
      <DashboardDateFilter
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />
      <OrderStats dateFilter={dateFilter} />
      <GrowthOverView />
      <RestaurantStatesTable dateFilter={dateFilter} />
    </div>
  );
}
