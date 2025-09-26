import { getDatabase } from "../connection"
import { Order } from "../models/order"

export class OrderRepository {
  private async getCollection() {
    const db = await getDatabase()
    return db.collection<Order>("orders")
  }

  async findAll(includeArchived = false): Promise<Order[]> {
    const collection = await this.getCollection()
    const query = includeArchived ? {} : { $or: [{ archived: { $exists: false } }, { archived: false }] }
    return await collection.find(query).sort({ createdAt: -1 }).toArray()
  }

  async findById(id: string): Promise<Order | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ id })
  }

  async findByOrderNumber(orderNumber: string): Promise<Order | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ orderNumber })
  }

  async findByCustomerEmail(email: string): Promise<Order[]> {
    const collection = await this.getCollection()
    return await collection.find({ "customerInfo.email": email.toLowerCase() }).sort({ createdAt: -1 }).toArray()
  }

  async findByStatus(status: Order["status"], includeArchived = false): Promise<Order[]> {
    const collection = await this.getCollection()
    const query: any = { status }
    if (!includeArchived) query.$or = [{ archived: { $exists: false } }, { archived: false }]
    return await collection.find(query).sort({ createdAt: -1 }).toArray()
  }

  async findByDateRange(from: Date, to: Date, includeArchived = false): Promise<Order[]> {
    const collection = await this.getCollection()
    const query: any = { createdAt: { $gte: from, $lte: to } }
    if (!includeArchived) query.$or = [{ archived: { $exists: false } }, { archived: false }]
    return await collection.find(query).sort({ createdAt: -1 }).toArray()
  }

  async create(orderData: Omit<Order, "_id">): Promise<Order> {
    const collection = await this.getCollection()
    
    const order: Order = {
      ...orderData,
      archived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(order)
    return { ...order, _id: result.insertedId }
  }

  async updateStatus(id: string, status: Order["status"], notes?: string): Promise<Order | null> {
    const collection = await this.getCollection()
    
    const result = await collection.findOneAndUpdate(
      { id },
      { 
        $set: { 
          status,
          notes: notes || undefined,
          updatedAt: new Date() 
        } 
      },
      { returnDocument: "after" }
    )

    return result || null
  }

  async updatePaymentStatus(id: string, paymentStatus: Order["paymentStatus"]): Promise<Order | null> {
    const collection = await this.getCollection()
    
    const result = await collection.findOneAndUpdate(
      { id },
      { 
        $set: { 
          paymentStatus,
          updatedAt: new Date() 
        } 
      },
      { returnDocument: "after" }
    )

    return result || null
  }

  async setArchived(id: string, archived: boolean): Promise<Order | null> {
    const collection = await this.getCollection()
    const result = await collection.findOneAndUpdate(
      { id },
      { $set: { archived, updatedAt: new Date() } },
      { returnDocument: "after" }
    )
    return result || null
  }

  async getStats() {
    const collection = await this.getCollection()
    
    const [
      totalOrders,
      pendingOrders,
      confirmedOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      revenueResult
    ] = await Promise.all([
      collection.countDocuments(),
      collection.countDocuments({ status: "pending" }),
      collection.countDocuments({ status: "confirmed" }),
      collection.countDocuments({ status: "processing" }),
      collection.countDocuments({ status: "shipped" }),
      collection.countDocuments({ status: "delivered" }),
      collection.countDocuments({ status: "cancelled" }),
      collection.aggregate([
        { $match: { status: { $ne: "cancelled" } } },
        { $group: { _id: null, total: { $sum: "$total" } } }
      ]).toArray()
    ])

    const totalRevenue = revenueResult[0]?.total || 0
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    return {
      totalOrders,
      pendingOrders,
      confirmedOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
      averageOrderValue,
    }
  }

  async generateOrderNumber(): Promise<string> {
    const collection = await this.getCollection()
    const year = new Date().getFullYear()
    const count = await collection.countDocuments({
      orderNumber: { $regex: `^EMH-${year}-` }
    })
    
    return `EMH-${year}-${String(count + 1).padStart(3, "0")}`
  }
}

export const orderRepository = new OrderRepository()