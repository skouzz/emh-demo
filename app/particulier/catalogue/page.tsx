"use client"

import { useEffect } from "react"
import ProductsPage from "@/app/products/page"
import { useAudience } from "@/hooks/use-audience"

export default function ParticulierCataloguePage() {
  const { audience, setAudience } = useAudience()

  useEffect(() => {
    if (audience !== "particulier") setAudience("particulier")
  }, [audience, setAudience])

  return <ProductsPage />
} 