"use client"

import { useState, useEffect } from "react"
import { cartStore } from "@/lib/cart-store"
import type { Cart, Product } from "@/lib/types"

export function useCart() {
  const [cart, setCart] = useState<Cart>(cartStore.getCart())

  useEffect(() => {
    setCart(cartStore.getCart())

    const unsubscribe = cartStore.subscribe(() => {
      setCart(cartStore.getCart())
    })

    return unsubscribe
  }, [])

  return {
    cart,
    itemCount: cartStore.getItemCount(),
    addItem: (product: Product, quantity?: number) => cartStore.addItem(product, quantity),
    updateItemQuantity: (itemId: string, quantity: number) => cartStore.updateItemQuantity(itemId, quantity),
    removeItem: (itemId: string) => cartStore.removeItem(itemId),
    clearCart: () => cartStore.clearCart(),
    isProductInCart: (productId: string) => cartStore.isProductInCart(productId),
    getProductQuantity: (productId: string) => cartStore.getProductQuantity(productId),
  }
}
