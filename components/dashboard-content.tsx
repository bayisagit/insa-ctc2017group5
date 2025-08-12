"use client"

import { MetricsCards } from "@/components/metrics-cards"
import { OrdersChart } from "@/components/orders-chart"
import { RevenueChart } from "@/components/revenue-chart"
import { RecentOrders } from "@/components/recent-orders"
import { RestaurantPerformance } from "@/components/restaurant-performance"
import { DriverStats } from "@/components/driver-stats"

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
  )
}
