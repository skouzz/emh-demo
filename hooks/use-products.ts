"use client"

import { useState, useEffect } from "react"
import type { Product, ProductCategory } from "@/lib/db/models/product"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const [productsRes, categoriesRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/categories")
      ])
      
      if (productsRes.ok && categoriesRes.ok) {
        const productsData = await productsRes.json()
        const categoriesData = await categoriesRes.json()
        
        setProducts(productsData.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
        })))
        
        setCategories(categoriesData.map((c: any) => ({
          ...c,
          createdAt: new Date(c.createdAt),
          updatedAt: new Date(c.updatedAt),
        })))
      }
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addProduct = async (productData: Omit<Product, "_id" | "id" | "createdAt" | "updatedAt">) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      })
      
      if (response.ok) {
        await loadData()
      }
    } catch (error) {
      console.error("Error adding product:", error)
    }
  }

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      
      if (response.ok) {
        await loadData()
      }
    } catch (error) {
      console.error("Error updating product:", error)
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })
      
      if (response.ok) {
        await loadData()
      }
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  const addCategory = async (categoryData: Omit<ProductCategory, "_id" | "id" | "createdAt" | "updatedAt">) => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      })
      
      if (response.ok) {
        await loadData()
      }
    } catch (error) {
      console.error("Error adding category:", error)
    }
  }

  const updateCategory = async (id: string, updates: Partial<ProductCategory>) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      
      if (response.ok) {
        await loadData()
      }
    } catch (error) {
      console.error("Error updating category:", error)
    }
  }

  const deleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      })
      
      if (response.ok) {
        await loadData()
      }
    } catch (error) {
      console.error("Error deleting category:", error)
    }
  }

  const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id)
  }

  const getProductsByCategory = (categoryId: string): Product[] => {
    return products.filter(p => p.category === categoryId)
  }

  const getFeaturedProducts = (): Product[] => {
    return products.filter(p => p.featured)
  }

  const searchProducts = (query: string): Product[] => {
    const lowercaseQuery = query.toLowerCase()
    return products.filter(p =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.reference.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery)
    )
  }

  const getCategoryById = (id: string): ProductCategory | undefined => {
    return categories.find(c => c.id === id)
  }

  return {
    products,
    categories,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    searchProducts,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
    refreshData: loadData,
  }
}