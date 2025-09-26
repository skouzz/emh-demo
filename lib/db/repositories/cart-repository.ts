import { getDatabase } from "../connection"
import { Cart } from "../models/cart"

export class CartRepository {
  private async getCollection() {
    const db = await getDatabase()
    return db.collection<Cart>("carts")
  }

  async findByUserId(userId: string): Promise<Cart | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ userId })
  }

  async findBySessionId(sessionId: string): Promise<Cart | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ sessionId })
  }

  async findById(id: string): Promise<Cart | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ id })
  }

  async create(cartData: Omit<Cart, "_id">): Promise<Cart> {
    const collection = await this.getCollection()
    
    const cart: Cart = {
      ...cartData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(cart)
    return { ...cart, _id: result.insertedId }
  }

  async update(id: string, updates: Partial<Cart>): Promise<Cart | null> {
    const collection = await this.getCollection()
    
    const result = await collection.findOneAndUpdate(
      { id },
      { 
        $set: { 
          ...updates, 
          updatedAt: new Date() 
        } 
      },
      { returnDocument: "after" }
    )

    return result || null
  }

  async delete(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.deleteOne({ id })
    return result.deletedCount > 0
  }

  async clearExpiredCarts(daysOld: number = 30): Promise<number> {
    const collection = await this.getCollection()
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysOld)
    
    const result = await collection.deleteMany({
      updatedAt: { $lt: cutoffDate },
      userId: { $exists: false }
    })
    
    return result.deletedCount
  }
}

export const cartRepository = new CartRepository()