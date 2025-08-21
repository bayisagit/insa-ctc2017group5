import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, DollarSign, Store, Truck, Users, TrendingUp, TrendingDown } from "lucide-react"

export function MetricsCards() {
  const metrics = [
    {
      title: "Total Orders",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: ShoppingCart,
      description: "vs last month",
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      description: "vs last month",
    },
    {
      title: "Active Restaurants",
      value: "156",
      change: "+3.1%",
      trend: "up",
      icon: Store,
      description: "vs last month",
    },
    {
      title: "Active Drivers",
      value: "89",
      change: "-2.4%",
      trend: "down",
      icon: Truck,
      description: "vs last month",
    },
    {
      title: "Total Users",
      value: "12,847",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      description: "vs last month",
    },
    {
      title: "Avg Order Value",
      value: "$28.50",
      change: "+5.7%",
      trend: "up",
      icon: TrendingUp,
      description: "vs last month",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Badge variant={metric.trend === "up" ? "default" : "destructive"} className="text-xs">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {metric.change}
              </Badge>
              <span>{metric.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
