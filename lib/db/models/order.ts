import { ObjectId } from "mongodb"

export interface OrderItem {
  id: string
  productId: string
  productName: string
  productReference: string
  productImage?: string
  quantity: number
  price: number
  subtotal: number
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  notes?: string
}

export interface Order {
  _id?: ObjectId
  id: string
  orderNumber: string
  customerId?: string
  customerInfo: CustomerInfo
  items: OrderItem[]
  subtotal: number
  tax: number
  total: number
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed"
  paymentMethod: "cash_on_delivery" | "bank_transfer" | "card"
  shippingMethod: "standard" | "express" | "pickup"
  estimatedDelivery?: Date
  actualDelivery?: Date
  notes?: string
  archived?: boolean
  createdAt: Date
  updatedAt: Date
}