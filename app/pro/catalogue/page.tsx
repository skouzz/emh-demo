"use client"

import { useEffect } from "react"
import ProductsPage from "@/app/products/page"
import { useAudience } from "@/hooks/use-audience"

export default function ProCataloguePage() {
  const { audience, setAudience } = useAudience()

  useEffect(() => {
    if (audience !== "pro") setAudience("pro")
  }, [audience, setAudience])

  return <ProductsPage />
} 