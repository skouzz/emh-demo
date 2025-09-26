"use client"

import { useState } from "react"
import { Plus, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProducts } from "@/hooks/use-products"
import ProductList from "@/components/admin/ProductList"
import ProductForm from "@/components/admin/ProductForm"
import Link from "next/link"

export default function AdminProductsPage() {
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<string | null>(null)
  const { products, categories } = useProducts()

  const handleEditProduct = (productId: string) => {
    setEditingProduct(productId)
    setShowProductForm(true)
  }

  const handleCloseForm = () => {
    setShowProductForm(false)
    setEditingProduct(null)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Produits</h1>
          <p className="text-gray-600">Gérez le catalogue de produits Legrand ({products.length} produits)</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/products/import">
              <Upload className="h-4 w-4 mr-2" />
              Importer
            </Link>
          </Button>
          <Button onClick={() => setShowProductForm(true)} className="bg-emh-red hover:bg-red-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Produit
          </Button>
        </div>
      </div>

      <ProductList products={products} categories={categories} onEdit={handleEditProduct} />

      {/* Product Form Modal */}
      {showProductForm && <ProductForm productId={editingProduct} onClose={handleCloseForm} />}
    </div>
  )
}
