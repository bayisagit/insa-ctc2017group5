"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RevenueChart() {
  const revenueData = [
    { month: "Jan", revenue: 12500, growth: "+8.2%" },
    { month: "Feb", revenue: 15200, growth: "+21.6%" },
    { month: "Mar", revenue: 18900, growth: "+24.3%" },
    { month: "Apr", revenue: 22100, growth: "+16.9%" },
    { month: "May", revenue: 25800, growth: "+16.7%" },
    { month: "Jun", revenue: 28400, growth: "+10.1%" },
  ]

  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue))

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Revenue Trends</CardTitle>
        <CardDescription>Monthly revenue growth over 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {revenueData.map((data) => (
            <div key={data.month} className="flex items-center space-x-4">
              <div className="w-8 text-sm font-medium">{data.month}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                  />
                  <span className="text-sm font-medium">${data.revenue.toLocaleString()}</span>
                </div>
              </div>
              <Badge variant="outline" className="text-xs text-green-600">
                {data.growth}
              </Badge>
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Total revenue: $122,900</p>
          <p className="text-green-600">Average growth: +16.3%</p>
        </div>
      </CardContent>
    </Card>
  )
}