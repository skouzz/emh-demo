import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function GET() {
  try {
    const db = await getDb()
    const categories = db.collection("categories")
    const products = db.collection("products")

    const catCount = await categories.countDocuments()
    let insertedCategories = 0

    if (catCount === 0) {
      const defaultCategories = [
        {
          id: "1",
          name: "Appareillage",
          description: "Interrupteurs, prises et accessoires",
          subcategories: [
            { id: "1-1", name: "Interrupteurs", description: "Gamme complète d'interrupteurs" },
            { id: "1-2", name: "Prises", description: "Prises électriques et spécialisées" },
            { id: "1-3", name: "Variateurs", description: "Variateurs d'éclairage" },
          ],
        },
        {
          id: "2",
          name: "Tableaux Électriques",
          description: "Solutions de distribution électrique",
          subcategories: [
            { id: "2-1", name: "Coffrets", description: "Coffrets de distribution" },
            { id: "2-2", name: "Disjoncteurs", description: "Protection électrique" },
            { id: "2-3", name: "Accessoires", description: "Accessoires de tableau" },
          ],
        },
        {
          id: "3",
          name: "Domotique",
          description: "Solutions intelligentes MyHOME",
          subcategories: [
            { id: "3-1", name: "Éclairage", description: "Gestion intelligente de l'éclairage" },
            { id: "3-2", name: "Volets", description: "Automatisation des volets" },
            { id: "3-3", name: "Sécurité", description: "Systèmes de sécurité connectés" },
          ],
        },
        {
          id: "4",
          name: "Câblage",
          description: "Solutions de câblage et connectique",
          subcategories: [
            { id: "4-1", name: "Goulottes", description: "Goulottes et moulures" },
            { id: "4-2", name: "Conduits", description: "Conduits et accessoires" },
            { id: "4-3", name: "Connectique", description: "Bornes et connecteurs" },
          ],
        },
      ]
      const res = await categories.insertMany(defaultCategories.map((c) => ({ ...c, createdAt: new Date() })))
      insertedCategories = res.insertedCount
    }

    const prodCount = await products.countDocuments()
    let insertedProducts = 0
    if (prodCount === 0) {
      const sampleProduct = {
        id: Date.now().toString(),
        name: "Interrupteur Legrand Céliane",
        reference: "LGD-CEL-INT-01",
        description: "Interrupteur design avec finition premium",
        category: "1",
        characteristics: { Couleur: "Blanc", Finition: "Mat" },
        technicalSpecs: { Tension: "230V", Courant: "10A" },
        images: [],
        technicalFiles: [],
        price: 0,
        availability: "in-stock",
        featured: true,
        audience: "both",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      const res = await products.insertOne(sampleProduct)
      insertedProducts = res.insertedId ? 1 : 0
    }

    return NextResponse.json({
      ok: true,
      db: db.databaseName,
      insertedCategories,
      insertedProducts,
      message: "Seed executed",
    })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 })
  }
} 