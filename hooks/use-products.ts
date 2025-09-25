"use client"

import { useState, useEffect } from "react"
import type { Product, ProductCategory } from "@/lib/types"
import { productStore } from "@/lib/product-store"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>([])

  useEffect(() => {
    setProducts(productStore.getAllProducts())
    setCategories(productStore.getAllCategories())

    const unsubscribe = productStore.subscribe(() => {
      setProducts(productStore.getAllProducts())
      setCategories(productStore.getAllCategories())
    })

    return unsubscribe
  }, [])

  return {
    products,
    categories,
    addProduct: productStore.addProduct.bind(productStore),
    updateProduct: productStore.updateProduct.bind(productStore),
    deleteProduct: productStore.deleteProduct.bind(productStore),
    getProductById: productStore.getProductById.bind(productStore),
    getProductsByCategory: productStore.getProductsByCategory.bind(productStore),
    getFeaturedProducts: productStore.getFeaturedProducts.bind(productStore),
    searchProducts: productStore.searchProducts.bind(productStore),
    getCategoryById: productStore.getCategoryById.bind(productStore),
    addCategory: productStore.addCategory.bind(productStore),
    updateCategory: productStore.updateCategory.bind(productStore),
    deleteCategory: productStore.deleteCategory.bind(productStore),
  }
}
