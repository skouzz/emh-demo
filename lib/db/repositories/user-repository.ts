import { getDatabase } from "../connection"
import { User, CustomerUser } from "../models/user"
import { ObjectId } from "mongodb"

export class UserRepository {
  private async getCollection() {
    const db = await getDatabase()
    return db.collection<User>("users")
  }

  private async getCustomerCollection() {
    const db = await getDatabase()
    return db.collection<CustomerUser>("customers")
  }

  async findByEmail(email: string): Promise<User | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ email: email.toLowerCase() })
  }

  async findById(id: string): Promise<User | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ id })
  }

  async findAll(): Promise<User[]> {
    const collection = await this.getCollection()
    return await collection.find({}).toArray()
  }

  async create(userData: Omit<User, "_id">): Promise<User> {
    const collection = await this.getCollection()
    
    // Check if user already exists
    const existing = await this.findByEmail(userData.email)
    if (existing) {
      throw new Error("Un utilisateur avec cet email existe déjà")
    }

    const user: User = {
      ...userData,
      email: userData.email.toLowerCase(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(user)
    return { ...user, _id: result.insertedId }
  }

  async update(id: string, updates: Partial<User>): Promise<User | null> {
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

  // Customer methods
  async findCustomerByEmail(email: string): Promise<CustomerUser | null> {
    const collection = await this.getCustomerCollection()
    return await collection.findOne({ email: email.toLowerCase() })
  }

  async createCustomer(customerData: Omit<CustomerUser, "_id">): Promise<CustomerUser> {
    const collection = await this.getCustomerCollection()
    
    const customer: CustomerUser = {
      ...customerData,
      email: customerData.email.toLowerCase(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(customer)
    return { ...customer, _id: result.insertedId }
  }

  async updateCustomer(id: string, updates: Partial<CustomerUser>): Promise<CustomerUser | null> {
    const collection = await this.getCustomerCollection()
    
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

  // Initialize default users
  async initializeDefaultUsers(): Promise<void> {
    const collection = await this.getCollection()
    
    // Check if superadmin exists
    const superAdmin = await this.findByEmail("super@emh.tn")
    if (!superAdmin) {
      await this.create({
        id: "0",
        email: "super@emh.tn",
        name: "Super Admin",
        role: "superadmin",
        password: "super123",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    // Check if admin exists
    const admin = await this.findByEmail("admin@emh.tn")
    if (!admin) {
      await this.create({
        id: "1",
        email: "admin@emh.tn",
        name: "Administrateur EMH",
        role: "admin",
        password: "admin123",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
  }
}

export const userRepository = new UserRepository()