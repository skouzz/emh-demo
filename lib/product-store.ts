"use client"

import type { Product, ProductCategory } from "./types"

// Local storage keys
const PRODUCTS_KEY = "emh_products"
const CATEGORIES_KEY = "emh_categories"

// Default categories for Legrand products
const defaultCategories: ProductCategory[] = [
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

class ProductStore {
  private products: Product[] = []
  private categories: ProductCategory[] = defaultCategories
  private listeners: (() => void)[] = []

  constructor() {
    if (typeof window !== "undefined") {
      this.loadFromStorage()
    }
  }

  private loadFromStorage() {
    try {
      const storedProducts = localStorage.getItem(PRODUCTS_KEY)
      const storedCategories = localStorage.getItem(CATEGORIES_KEY)

      if (storedProducts) {
        this.products = JSON.parse(storedProducts).map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
        }))
      }

      if (storedCategories) {
        this.categories = JSON.parse(storedCategories)
      }
    } catch (error) {
      console.error("Error loading from storage:", error)
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(this.products))
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(this.categories))
    } catch (error) {
      console.error("Error saving to storage:", error)
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener())
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  // Product methods
  getAllProducts(): Product[] {
    return [...this.products]
  }

  getProductById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id)
  }

  getProductsByCategory(categoryId: string): Product[] {
    return this.products.filter((p) => p.category === categoryId)
  }

  getFeaturedProducts(): Product[] {
    return this.products.filter((p) => p.featured)
  }

  searchProducts(query: string): Product[] {
    const lowercaseQuery = query.toLowerCase()
    return this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowercaseQuery) ||
        p.reference.toLowerCase().includes(lowercaseQuery) ||
        p.description.toLowerCase().includes(lowercaseQuery),
    )
  }

  addProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.products.push(newProduct)
    this.saveToStorage()
    this.notifyListeners()
    return newProduct
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = this.products.findIndex((p) => p.id === id)
    if (index === -1) return null

    this.products[index] = {
      ...this.products[index],
      ...updates,
      updatedAt: new Date(),
    }

    this.saveToStorage()
    this.notifyListeners()
    return this.products[index]
  }

  deleteProduct(id: string): boolean {
    const index = this.products.findIndex((p) => p.id === id)
    if (index === -1) return false

    this.products.splice(index, 1)
    this.saveToStorage()
    this.notifyListeners()
    return true
  }

  // Category methods
  getAllCategories(): ProductCategory[] {
    return [...this.categories]
  }

  getCategoryById(id: string): ProductCategory | undefined {
    return this.categories.find((c) => c.id === id)
  }

  addCategory(category: Omit<ProductCategory, "id">): ProductCategory {
    const newCategory: ProductCategory = {
      ...category,
      id: Date.now().toString(),
    }

    this.categories.push(newCategory)
    this.saveToStorage()
    this.notifyListeners()
    return newCategory
  }

  updateCategory(id: string, updates: Partial<ProductCategory>): ProductCategory | null {
    const index = this.categories.findIndex((c) => c.id === id)
    if (index === -1) return null

    this.categories[index] = {
      ...this.categories[index],
      ...updates,
    }

    this.saveToStorage()
    this.notifyListeners()
    return this.categories[index]
  }

  deleteCategory(id: string): boolean {
    const index = this.categories.findIndex((c) => c.id === id)
    if (index === -1) return false

    // Check if any products use this category
    const productsInCategory = this.products.filter((p) => p.category === id)
    if (productsInCategory.length > 0) {
      throw new Error(`Cannot delete category: ${productsInCategory.length} products are using this category`)
    }

    this.categories.splice(index, 1)
    this.saveToStorage()
    this.notifyListeners()
    return true
  }
}

export const productStore = new ProductStore()
