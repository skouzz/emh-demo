import { ObjectId } from "mongodb"
import { Product } from "./product"

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  addedAt: Date
}

export interface Cart {
  _id?: ObjectId
  id: string
  userId?: string
  sessionId?: string
  items: CartItem[]
  total: number
  createdAt: Date
  updatedAt: Date
}