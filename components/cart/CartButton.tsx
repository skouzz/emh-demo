"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"

interface CartButtonProps {
  onClick: () => void
}

export default function CartButton({ onClick }: CartButtonProps) {
  const { itemCount } = useCart()

  return (
    <Button variant="outline" onClick={onClick} className="relative bg-transparent">
      <ShoppingCart className="h-4 w-4" />
      <span className="hidden sm:inline ml-2">Panier</span>
      {itemCount > 0 && (
        <Badge className="absolute -top-2 -right-2 bg-emh-red text-white min-w-[20px] h-5 flex items-center justify-center text-xs">
          {itemCount}
        </Badge>
      )}
    </Button>
  )
}
