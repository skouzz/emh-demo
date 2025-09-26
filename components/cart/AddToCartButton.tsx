"use client"

import { useState } from "react"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import type { Product } from "@/lib/db/models/product"

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export default function AddToCartButton({
  product,
  quantity = 1,
  variant = "default",
  size = "default",
  className = "",
}: AddToCartButtonProps) {
  const { addItem, isProductInCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const handleAddToCart = async () => {
    if (product.availability === "out-of-stock") return

    setIsAdding(true)

    // Simulate a brief loading state
    await new Promise((resolve) => setTimeout(resolve, 300))

    addItem(product, quantity)
    setIsAdding(false)
    setJustAdded(true)

    // Reset the "just added" state after 2 seconds
    setTimeout(() => setJustAdded(false), 2000)
  }

  const isInCart = isProductInCart(product.id)
  const isOutOfStock = product.availability === "out-of-stock"

  if (isOutOfStock) {
    return (
      <Button variant="outline" size={size} className={`${className} cursor-not-allowed`} disabled>
        Rupture de stock
      </Button>
    )
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`${className} ${
        variant === "default" ? "bg-emh-red hover:bg-red-700 text-white" : ""
      } transition-all duration-200`}
    >
      {isAdding ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
          Ajout...
        </>
      ) : justAdded ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Ajouté!
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isInCart ? "Ajouter encore" : "Ajouter au panier"}
        </>
      )}
    </Button>
  )
}
