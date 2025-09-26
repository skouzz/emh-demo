// Re-export types from models for backward compatibility
export type { Order, OrderItem, CustomerInfo } from "@/lib/db/models/order"

export interface OrderStatusUpdate {
  orderId: string
  status: Order["status"]
  notes?: string
  timestamp: Date
}
