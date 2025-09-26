import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/db/connection"

export async function POST() {
  try {
    const db = await getDatabase()
    
    // Create indexes for better performance
    await Promise.all([
      // Users collection indexes
      db.collection("users").createIndex({ email: 1 }, { unique: true }),
      db.collection("users").createIndex({ id: 1 }, { unique: true }),
      db.collection("users").createIndex({ role: 1 }),
      
      // Products collection indexes
      db.collection("products").createIndex({ id: 1 }, { unique: true }),
      db.collection("products").createIndex({ reference: 1 }, { unique: true }),
      db.collection("products").createIndex({ category: 1 }),
      db.collection("products").createIndex({ featured: 1 }),
      db.collection("products").createIndex({ availability: 1 }),
      db.collection("products").createIndex({ 
        name: "text", 
        description: "text", 
        reference: "text" 
      }),
      
      // Categories collection indexes
      db.collection("categories").createIndex({ id: 1 }, { unique: true }),
      db.collection("categories").createIndex({ name: 1 }),
      
      // Orders collection indexes
      db.collection("orders").createIndex({ id: 1 }, { unique: true }),
      db.collection("orders").createIndex({ orderNumber: 1 }, { unique: true }),
      db.collection("orders").createIndex({ "customerInfo.email": 1 }),
      db.collection("orders").createIndex({ status: 1 }),
      db.collection("orders").createIndex({ createdAt: -1 }),
      
      // Customers collection indexes
      db.collection("customers").createIndex({ email: 1 }, { unique: true }),
      db.collection("customers").createIndex({ id: 1 }, { unique: true }),
      
      // Carts collection indexes
      db.collection("carts").createIndex({ id: 1 }, { unique: true }),
      db.collection("carts").createIndex({ userId: 1 }),
      db.collection("carts").createIndex({ sessionId: 1 }),
      db.collection("carts").createIndex({ updatedAt: 1 }),
    ])

    return NextResponse.json({ 
      success: true, 
      message: "Database indexes created successfully" 
    })
  } catch (error) {
    console.error("Error initializing database:", error)
    return NextResponse.json({ 
      error: "Failed to initialize database",
      details: error.message 
    }, { status: 500 })
  }
}