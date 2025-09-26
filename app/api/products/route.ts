import { NextRequest, NextResponse } from "next/server"
import { productRepository } from "@/lib/db/repositories/product-repository"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const search = searchParams.get("search")

    let products

    if (search) {
      products = await productRepository.searchProducts(search)
    } else if (category) {
      products = await productRepository.findProductsByCategory(category)
    } else if (featured === "true") {
      products = await productRepository.findFeaturedProducts()
    } else {
      products = await productRepository.findAllProducts()
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json()
    
    // Generate unique ID
    productData.id = Date.now().toString()
    
    const product = await productRepository.createProduct(productData)
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}