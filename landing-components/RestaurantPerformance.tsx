import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export function RestaurantPerformance() {
  const restaurants = [
    {
      name: "Pizza Palace",
      orders: 145,
      revenue: 4250,
      rating: 4.8,
      status: "ACTIVE",
    },
    {
      name: "Burger Barn",
      orders: 132,
      revenue: 3890,
      rating: 4.6,
      status: "ACTIVE",
    },
    {
      name: "Sushi Spot",
      orders: 98,
      revenue: 5670,
      rating: 4.9,
      status: "ACTIVE",
    },
    {
      name: "Taco Time",
      orders: 87,
      revenue: 2340,
      rating: 4.4,
      status: "ACTIVE",
    },
    {
      name: "Pasta Place",
      orders: 76,
      revenue: 2890,
      rating: 4.7,
      status: "ACTIVE",
    },
  ]

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Top Restaurants</CardTitle>
        <CardDescription>Best performing restaurants this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {restaurants.map((restaurant, index) => (
            <div key={restaurant.name} className="flex items-center space-x-4">
              <div className="w-6 text-sm font-medium text-muted-foreground">#{index + 1}</div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{restaurant.name}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{restaurant.orders} orders</span>
                  <span>${restaurant.revenue.toLocaleString()}</span>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {restaurant.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}