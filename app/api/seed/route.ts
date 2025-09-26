import { NextResponse } from "next/server"
import { userRepository } from "@/lib/db/repositories/user-repository"
import { productRepository } from "@/lib/db/repositories/product-repository"

export async function GET() {
  try {
    // Initialize default users
    await userRepository.initializeDefaultUsers()
    
    // Initialize default categories
    await productRepository.initializeDefaultCategories()
    
    // Add a sample product if none exist
    const products = await productRepository.findAllProducts()
    if (products.length === 0) {
      await productRepository.createProduct({
        id: Date.now().toString(),
        name: "Interrupteur Legrand Céliane",
        reference: "LGD-CEL-INT-01",
        description: "Interrupteur design avec finition premium",
        category: "1",
        characteristics: { Couleur: "Blanc", Finition: "Mat" },
        technicalSpecs: { Tension: "230V", Courant: "10A" },
        images: [],
        technicalFiles: [],
        price: 45.50,
        availability: "in-stock",
        featured: true,
        audience: "both",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    return NextResponse.json({
      ok: true,
      message: "Database seeded successfully",
    })
  } catch (err: any) {
    console.error("Seed error:", err)
    return NextResponse.json({ 
      ok: false, 
      error: err?.message || String(err) 
    }, { status: 500 })
  }
} 