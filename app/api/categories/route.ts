import { NextRequest, NextResponse } from "next/server"
import { productRepository } from "@/lib/db/repositories/product-repository"

export async function GET() {
  try {
    const categories = await productRepository.findAllCategories()
    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const categoryData = await request.json()
    
    // Generate unique ID
    categoryData.id = Date.now().toString()
    
    const category = await productRepository.createCategory(categoryData)
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}