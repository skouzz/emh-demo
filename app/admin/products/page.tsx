"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProducts } from "@/hooks/use-products"
import ProductList from "@/components/admin/ProductList"
import ProductForm from "@/components/admin/ProductForm"

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
        <Button onClick={() => setShowProductForm(true)} className="bg-emh-red hover:bg-red-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Produit
        </Button>
      </div>

      <ProductList products={products} categories={categories} onEdit={handleEditProduct} />

      {/* Product Form Modal */}
      {showProductForm && <ProductForm productId={editingProduct} onClose={handleCloseForm} />}
    </div>
  )
}
