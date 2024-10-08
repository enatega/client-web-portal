

import RestaurantStats from "@/lib/ui/screen-components/protected/vendor/dashboard/restaurant-stats";
import DashboardDateFilter from "@/lib/ui/useable-components/date-filter";

import React, { useState } from 'react'

export default function VendorDashboardScreen() {

    const [dateFilter, setDateFilter] = useState({
        startDate: `${new Date().getFullYear()}-01-01`, // Current year, January 1st
        endDate: `${new Date().getFullYear()}-${String(new Date().getMonth()).padStart(2, '0')}-${String(new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate()).padStart(2, '0')}`, // Last day of previous month
    });


    return (
        <div className="screen-container">
            <DashboardDateFilter dateFilter={dateFilter} setDateFilter={setDateFilter} />
            <RestaurantStats dateFilter={dateFilter} />
        </div>
    )
}
