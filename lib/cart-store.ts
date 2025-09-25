"use client"

import type { Cart, CartItem, Product } from "./types"

const CART_KEY = "emh_cart"

class CartStore {
  private cart: Cart = {
    id: "default",
    items: [],
    total: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  private listeners: (() => void)[] = []

  constructor() {
    if (typeof window !== "undefined") {
      this.loadFromStorage()
    }
  }

  private loadFromStorage() {
    try {
      const storedCart = localStorage.getItem(CART_KEY)
      if (storedCart) {
        const parsed = JSON.parse(storedCart)
        this.cart = {
          ...parsed,
          createdAt: new Date(parsed.createdAt),
          updatedAt: new Date(parsed.updatedAt),
          items: parsed.items.map((item: any) => ({
            ...item,
            addedAt: new Date(item.addedAt),
            product: {
              ...item.product,
              createdAt: new Date(item.product.createdAt),
              updatedAt: new Date(item.product.updatedAt),
            },
          })),
        }
      }
    } catch (error) {
      console.error("Error loading cart from storage:", error)
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(this.cart))
    } catch (error) {
      console.error("Error saving cart to storage:", error)
    }
  }

  private calculateTotal() {
    this.cart.total = this.cart.items.reduce((total, item) => {
      return total + (item.product.price || 0) * item.quantity
    }, 0)
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

  getCart(): Cart {
    return { ...this.cart }
  }

  getItemCount(): number {
    return this.cart.items.reduce((count, item) => count + item.quantity, 0)
  }

  addItem(product: Product, quantity = 1): void {
    const existingItemIndex = this.cart.items.findIndex((item) => item.productId === product.id)

    if (existingItemIndex >= 0) {
      this.cart.items[existingItemIndex].quantity += quantity
    } else {
      const newItem: CartItem = {
        id: Date.now().toString() + Math.random(),
        productId: product.id,
        product,
        quantity,
        addedAt: new Date(),
      }
      this.cart.items.push(newItem)
    }

    this.cart.updatedAt = new Date()
    this.calculateTotal()
    this.saveToStorage()
    this.notifyListeners()
  }

  updateItemQuantity(itemId: string, quantity: number): void {
    const itemIndex = this.cart.items.findIndex((item) => item.id === itemId)
    if (itemIndex >= 0) {
      if (quantity <= 0) {
        this.cart.items.splice(itemIndex, 1)
      } else {
        this.cart.items[itemIndex].quantity = quantity
      }

      this.cart.updatedAt = new Date()
      this.calculateTotal()
      this.saveToStorage()
      this.notifyListeners()
    }
  }

  removeItem(itemId: string): void {
    this.cart.items = this.cart.items.filter((item) => item.id !== itemId)
    this.cart.updatedAt = new Date()
    this.calculateTotal()
    this.saveToStorage()
    this.notifyListeners()
  }

  clearCart(): void {
    this.cart = {
      id: "default",
      items: [],
      total: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.saveToStorage()
    this.notifyListeners()
  }

  isProductInCart(productId: string): boolean {
    return this.cart.items.some((item) => item.productId === productId)
  }

  getProductQuantity(productId: string): number {
    const item = this.cart.items.find((item) => item.productId === productId)
    return item ? item.quantity : 0
  }
}

export const cartStore = new CartStore()
