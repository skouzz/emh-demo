// Re-export types from models for backward compatibility
export type { Product, ProductCategory, ProductSubcategory, TechnicalFile } from "./db/models/product"
export type { Order, OrderItem, CustomerInfo } from "./db/models/order"
export type { Cart, CartItem } from "./db/models/cart"
export type { User, CustomerUser } from "./db/models/user"

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  createdAt: Date
}
