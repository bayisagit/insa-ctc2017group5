import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentOrders() {
  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      restaurant: "Pizza Palace",
      total: 28.5,
      status: "DELIVERED",
      time: "2 min ago",
      avatar: "/diverse-customer-group.png",
    },
    {
      id: "ORD-002",
      customer: "Sarah Wilson",
      restaurant: "Burger Barn",
      total: 15.75,
      status: "OUT_FOR_DELIVERY",
      time: "5 min ago",
      avatar: "/diverse-customer-group.png",
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson",
      restaurant: "Sushi Spot",
      total: 42.0,
      status: "PREPARING",
      time: "8 min ago",
      avatar: "/diverse-customer-group.png",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      restaurant: "Taco Time",
      total: 19.25,
      status: "ACCEPTED",
      time: "12 min ago",
      avatar: "/diverse-customer-group.png",
    },
    {
      id: "ORD-005",
      customer: "David Brown",
      restaurant: "Pasta Place",
      total: 33.8,
      status: "PENDING",
      time: "15 min ago",
      avatar: "/diverse-customer-group.png",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800"
      case "OUT_FOR_DELIVERY":
        return "bg-blue-100 text-blue-800"
      case "PREPARING":
        return "bg-yellow-100 text-yellow-800"
      case "ACCEPTED":
        return "bg-purple-100 text-purple-800"
      case "PENDING":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest orders from your platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center space-x-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={order.avatar || "/placeholder.svg"} alt={order.customer} />
                <AvatarFallback>
                  {order.customer
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{order.customer}</p>
                  <p className="text-sm font-medium">${order.total}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{order.restaurant}</p>
                  <p className="text-xs text-muted-foreground">{order.time}</p>
                </div>
              </div>
              <Badge className={`text-xs ${getStatusColor(order.status)}`}>{order.status.replace("_", " ")}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}