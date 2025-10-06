"use client"

import React from "react"

import { useState, useMemo } from "react"
import {
  Package,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  User,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Search,
  ShoppingBasket,
  PackageCheck,
  Filter,
  MoreVertical,
  Calendar,
  DollarSign,
  TrendingUp,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Types
type OrderStatus = "PENDING" | "CONFIRMED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED"
type OrderType = "DELIVERY" | "PICKUP"
type PaymentStatus = "PENDING" | "PAID" | "FAILED"
type PaymentMethod = "CASH" | "CARD" | "MOBILE"

const mockOrders = [
  {
    id: "ORD-1001",
    orderNumber: "1001",
    type: "DELIVERY" as OrderType,
    createdAt: "2024-01-15T13:15:00",
    status: "PENDING" as OrderStatus,
    paymentStatus: "PENDING" as PaymentStatus,
    paymentMethod: "CASH" as PaymentMethod,
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+251 911 234 567",
      address: "123 Main St, Addis Ababa",
    },
    items: [
      {
        id: "item-1",
        name: "Vegetable Platter",
        variant: "Large",
        price: 18.5,
        quantity: 1,
        specialInstructions: "No onions please",
      },
      {
        id: "item-2",
        name: "Fruit Juice",
        variant: "Orange",
        price: 7.25,
        quantity: 2,
      },
    ],
    subtotal: 33.0,
    deliveryFee: 5.0,
    serviceFee: 2.75,
    total: 40.75,
    statusHistory: [{ status: "PENDING", timestamp: "2024-01-15T13:15:00", changedBy: "System" }],
  },
  {
    id: "ORD-1002",
    orderNumber: "1002",
    type: "PICKUP" as OrderType,
    createdAt: "2024-01-15T14:30:00",
    status: "CONFIRMED" as OrderStatus,
    paymentStatus: "PAID" as PaymentStatus,
    paymentMethod: "CARD" as PaymentMethod,
    customer: {
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+251 922 345 678",
      address: "456 Oak Avenue, Addis Ababa",
    },
    items: [
      {
        id: "item-3",
        name: "Grilled Chicken",
        variant: "Medium",
        price: 25.0,
        quantity: 1,
      },
    ],
    subtotal: 25.0,
    deliveryFee: 0.0,
    serviceFee: 2.0,
    total: 27.0,
    statusHistory: [
      { status: "PENDING", timestamp: "2024-01-15T14:30:00", changedBy: "System" },
      { status: "CONFIRMED", timestamp: "2024-01-15T14:35:00", changedBy: "Admin" },
    ],
  },
  {
    id: "ORD-1003",
    orderNumber: "1003",
    type: "DELIVERY" as OrderType,
    createdAt: "2024-01-15T15:45:00",
    status: "DELIVERED" as OrderStatus,
    paymentStatus: "PAID" as PaymentStatus,
    paymentMethod: "MOBILE" as PaymentMethod,
    customer: {
      name: "Michael Chen",
      email: "michael@example.com",
      phone: "+251 933 456 789",
      address: "789 Pine Street, Addis Ababa",
    },
    items: [
      {
        id: "item-4",
        name: "Pizza Margherita",
        variant: "Large",
        price: 22.0,
        quantity: 2,
      },
    ],
    subtotal: 44.0,
    deliveryFee: 6.0,
    serviceFee: 3.5,
    total: 53.5,
    statusHistory: [
      { status: "PENDING", timestamp: "2024-01-15T15:45:00", changedBy: "System" },
      { status: "CONFIRMED", timestamp: "2024-01-15T15:50:00", changedBy: "Admin" },
      { status: "PREPARING", timestamp: "2024-01-15T16:00:00", changedBy: "Kitchen" },
      { status: "READY", timestamp: "2024-01-15T16:30:00", changedBy: "Kitchen" },
      { status: "DELIVERED", timestamp: "2024-01-15T17:15:00", changedBy: "Driver" },
    ],
  },
]

const statusConfig = {
  PENDING: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
  CONFIRMED: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: CheckCircle },
  PREPARING: { color: "bg-orange-100 text-orange-800 border-orange-200", icon: Package },
  READY: { color: "bg-green-100 text-green-800 border-green-200", icon: PackageCheck },
  DELIVERED: { color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: Truck },
  CANCELLED: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
}

export default function OrderManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL")
  const [selectedOrder, setSelectedOrder] = useState<any>(mockOrders[0] ?? null)

  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "ALL" || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  const stats = useMemo(() => {
    const totalOrders = mockOrders.length
    const pendingOrders = mockOrders.filter((o) => o.status === "PENDING").length
    const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0)
    const avgOrderValue = totalRevenue / totalOrders

    return { totalOrders, pendingOrders, totalRevenue, avgOrderValue }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Order Management</h1>
              <p className="text-sm text-muted-foreground">Manage and track all your orders</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Package className="h-4 w-4 mr-2" />
              New Order
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <p className="text-2xl font-bold text-foreground">{stats.totalOrders}</p>
                  </div>
                  <ShoppingBasket className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-foreground">{stats.pendingOrders}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="text-2xl font-bold text-foreground">${stats.totalRevenue.toFixed(2)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Order</p>
                    <p className="text-2xl font-bold text-foreground">${stats.avgOrderValue.toFixed(2)}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-200px)]">
        <div className="w-96 border-r bg-card/30 flex flex-col">
          <div className="p-6 border-b bg-card/50">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10 bg-background border-border"
                  placeholder="Search orders, customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={(value: OrderStatus | "ALL") => setStatusFilter(value)}>
                <SelectTrigger className="bg-background">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Orders</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="PREPARING">Preparing</SelectItem>
                  <SelectItem value="READY">Ready</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon
                return (
                  <Card
                    key={order.id}
                    className={`mb-3 cursor-pointer transition-all duration-200 hover:shadow-md border-0 ${
                      selectedOrder?.id === order.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-card/80"
                    }`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">#{order.orderNumber}</h3>
                            <Badge variant="outline" className={`text-xs ${statusConfig[order.status].color} border`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {order.status.toLowerCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{order.customer.name}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Cancel Order</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            {order.type === "DELIVERY" ? (
                              <Truck className="h-3 w-3" />
                            ) : (
                              <Package className="h-3 w-3" />
                            )}
                            {order.type.toLowerCase()}
                          </div>
                        </div>
                        <div className="font-semibold text-foreground">${order.total.toFixed(2)}</div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </ScrollArea>
        </div>

        <div className="flex-1 bg-background overflow-auto">
          {selectedOrder ? (
            <div className="p-6">
              <Tabs defaultValue="details" className="w-full">
                <div className="flex items-center justify-between mb-6">
                  <TabsList className="bg-muted">
                    <TabsTrigger value="details" className="data-[state=active]:bg-background">
                      Order Details
                    </TabsTrigger>
                    <TabsTrigger value="history" className="data-[state=active]:bg-background">
                      Status History
                    </TabsTrigger>
                  </TabsList>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Print Receipt
                    </Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Update Status
                    </Button>
                  </div>
                </div>

                <TabsContent value="details" className="space-y-6">
                  {/* Order Header */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">Order #{selectedOrder.orderNumber}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {/* <Badge className={`${statusConfig[selectedOrder.status]?.color} border px-3 py-1`}>
                            {React.createElement(statusConfig[selectedOrder.status].icon, {
                              className: "h-4 w-4 mr-2",
                            })}
                            {selectedOrder.status.toLowerCase()}
                          </Badge> */}
                          <Badge variant="secondary" className="px-3 py-1">
                            {selectedOrder.type === "DELIVERY" ? (
                              <Truck className="h-4 w-4 mr-2" />
                            ) : (
                              <Package className="h-4 w-4 mr-2" />
                            )}
                            {selectedOrder.type.toLowerCase()}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Customer Information */}
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5 text-primary" />
                          Customer Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="font-semibold text-foreground">{selectedOrder.customer.name}</p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedOrder.customer.phone}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedOrder.customer.email}</span>
                          </div>
                          {selectedOrder.customer.address && (
                            <div className="flex items-start gap-3 text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <span>{selectedOrder.customer.address}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Payment Information */}
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-primary" />
                          Payment Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Method:</span>
                          <Badge variant="outline">{selectedOrder.paymentMethod.toLowerCase()}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Status:</span>
                          <Badge
                            variant={selectedOrder.paymentStatus === "PAID" ? "default" : "secondary"}
                            className={selectedOrder.paymentStatus === "PAID" ? "bg-green-100 text-green-800" : ""}
                          >
                            {selectedOrder.paymentStatus.toLowerCase()}
                          </Badge>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Subtotal:</span>
                            <span>${selectedOrder.subtotal.toFixed(2)}</span>
                          </div>
                          {selectedOrder.deliveryFee > 0 && (
                            <div className="flex justify-between text-sm">
                              <span>Delivery Fee:</span>
                              <span>${selectedOrder.deliveryFee.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm">
                            <span>Service Fee:</span>
                            <span>${selectedOrder.serviceFee.toFixed(2)}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>${selectedOrder.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Order Items */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ShoppingBasket className="h-5 w-5 text-primary" />
                        Order Items
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedOrder.items.map((item: any, index: number) => (
                          <div key={item.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                  <Package className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{item.name}</h4>
                                  {item.variant && (
                                    <p className="text-sm text-muted-foreground">Variant: {item.variant}</p>
                                  )}
                                  {item.specialInstructions && (
                                    <p className="text-sm text-muted-foreground italic">
                                      Note: {item.specialInstructions}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                ${item.price.toFixed(2)} × {item.quantity}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        Status History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedOrder.statusHistory.map((history: any, index: number) => {
                          const StatusIcon = statusConfig[history.status as OrderStatus].icon
                          return (
                            <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                              <div className={`p-2 rounded-full ${statusConfig[history.status as OrderStatus].color}`}>
                                <StatusIcon className="h-4 w-4" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium capitalize">
                                  {history.status.toLowerCase().replace("_", " ")}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(history.timestamp).toLocaleString()} • Changed by {history.changedBy}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-muted-foreground">Select an order to view details</p>
                <p className="text-sm text-muted-foreground">Choose an order from the sidebar to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
