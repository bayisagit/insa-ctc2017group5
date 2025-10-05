"use client";

import { MetricsCards } from "@/components/admindashboard/MetricsCards";
import { OrdersChart } from "@/components/admindashboard/OrdersChart";
import { RevenueChart } from "@/components/admindashboard/RevenueChart";
import { RecentOrders } from "@/components/admindashboard/RecentOrders";
import { RestaurantPerformance } from "@/components/admindashboard/RestaurantPerformance";
import { DriverStats } from "@/components/sharedcomponents/DriverStats";

export function DashboardContent() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <MetricsCards />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <OrdersChart />
        <RevenueChart />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RecentOrders />
        <RestaurantPerformance />
      </div>

      <DriverStats />
    </div>
  );
}
