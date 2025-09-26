import { NextResponse } from "next/server"
import { userRepository } from "@/lib/db/repositories/user-repository"
import { productRepository } from "@/lib/db/repositories/product-repository"

export async function POST() {
  try {
    // Initialize default users
    await userRepository.initializeDefaultUsers()
    
    // Initialize default categories
    await productRepository.initializeDefaultCategories()
    
    return NextResponse.json({ 
      success: true, 
      message: "Database initialized successfully" 
    })
  } catch (error) {
    console.error("Error initializing database:", error)
    return NextResponse.json({ 
      error: "Failed to initialize database",
      details: error.message 
    }, { status: 500 })
  }
}