"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function OrdersChart() {
  // Mock data for the last 7 days
  const orderData = [
    { day: "Mon", orders: 145, status: "DELIVERED" },
    { day: "Tue", orders: 178, status: "DELIVERED" },
    { day: "Wed", orders: 162, status: "DELIVERED" },
    { day: "Thu", orders: 195, status: "DELIVERED" },
    { day: "Fri", orders: 234, status: "DELIVERED" },
    { day: "Sat", orders: 289, status: "DELIVERED" },
    { day: "Sun", orders: 267, status: "DELIVERED" },
  ]

  const maxOrders = Math.max(...orderData.map((d) => d.orders))

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Orders Overview</CardTitle>
        <CardDescription>Daily order volume for the past week</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="space-y-4">
          {orderData.map((data, index) => (
            <div key={data.day} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium">{data.day}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(data.orders / maxOrders) * 100}%` }}
                  />
                  <span className="text-sm font-medium">{data.orders}</span>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {data.status}
              </Badge>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Total this week: 1,470 orders</span>
          <span>+12.5% from last week</span>
        </div>
      </CardContent>
    </Card>
  )
}
