
export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED"
export type OrderType = "DELIVERY" | "PICKUP" | "DINE_IN"
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED"
export type PaymentMethod = "CASH" | "CARD" | "MOBILE_MONEY" | "BANK_TRANSFER"

export interface OrderItem {
  id: string
  name: string
  variant?: string
  price: number
  quantity: number
  specialInstructions?: string
}

export interface Customer {
  name: string
  email: string
  phone: string
  address?: string
}

export interface StatusHistoryEntry {
  status: OrderStatus
  timestamp: string
  changedBy: string
}

export interface Order {
  id: string
  orderNumber: string
  type: OrderType
  createdAt: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: PaymentMethod
  customer: Customer
  items: OrderItem[]
  subtotal: number
  deliveryFee?: number
  serviceFee?: number
  total: number
  statusHistory: StatusHistoryEntry[]
}
