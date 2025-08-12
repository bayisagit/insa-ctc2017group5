import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Truck, Clock, Star, MapPin } from "lucide-react"

export function DriverStats() {
  const drivers = [
    {
      id: "DRV-001",
      name: "Alex Rodriguez",
      vehicle: "Honda Civic",
      vehicleType: "CAR",
      deliveries: 23,
      rating: 4.9,
      status: "AVAILABLE",
      location: "Downtown",
      avatar: "/professional-driver.png",
    },
    {
      id: "DRV-002",
      name: "Maria Garcia",
      vehicle: "Toyota Camry",
      vehicleType: "CAR",
      deliveries: 18,
      rating: 4.8,
      status: "BUSY",
      location: "Midtown",
      avatar: "/professional-driver.png",
    },
    {
      id: "DRV-003",
      name: "James Wilson",
      vehicle: "Yamaha R15",
      vehicleType: "MOTORCYCLE",
      deliveries: 31,
      rating: 4.7,
      status: "AVAILABLE",
      location: "Uptown",
      avatar: "/professional-driver.png",
    },
    {
      id: "DRV-004",
      name: "Lisa Chen",
      vehicle: "Ford Focus",
      vehicleType: "CAR",
      deliveries: 15,
      rating: 4.9,
      status: "OFFLINE",
      location: "Westside",
      avatar: "/professional-driver.png",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-800"
      case "BUSY":
        return "bg-yellow-100 text-yellow-800"
      case "OFFLINE":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getVehicleIcon = (type: string) => {
    return <Truck className="h-4 w-4" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Driver Performance</CardTitle>
        <CardDescription>Current driver status and performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {drivers.map((driver) => (
            <div key={driver.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={driver.avatar || "/placeholder.svg"} alt={driver.name} />
                  <AvatarFallback>
                    {driver.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none">{driver.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{driver.id}</p>
                </div>
                <Badge className={`text-xs ${getStatusColor(driver.status)}`}>{driver.status}</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    {getVehicleIcon(driver.vehicleType)}
                    <span>{driver.vehicle}</span>
                  </div>
                  <span className="text-muted-foreground">{driver.vehicleType}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{driver.deliveries} deliveries</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{driver.rating}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{driver.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">89</div>
            <div className="text-xs text-muted-foreground">Total Drivers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">67</div>
            <div className="text-xs text-muted-foreground">Available Now</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">4.8</div>
            <div className="text-xs text-muted-foreground">Avg Rating</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
