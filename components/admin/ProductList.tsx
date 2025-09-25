"use client"

import { useState } from "react"
import { Edit, Trash2, Search, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Product, ProductCategory } from "@/lib/types"
import { useProducts } from "@/hooks/use-products"
import Image from "next/image"

interface ProductListProps {
  products: Product[]
  categories: ProductCategory[]
  onEdit: (productId: string) => void
}

export default function ProductList({ products, categories, onEdit }: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const { deleteProduct } = useProducts()

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.reference.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || "Non catégorisé"
  }

  const handleDelete = (productId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      deleteProduct(productId)
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher par nom ou référence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emh-red"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-500">
              {products.length === 0 ? (
                <>
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Aucun produit</h3>
                  <p>Commencez par ajouter votre premier produit au catalogue.</p>
                </>
              ) : (
                <>
                  <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Aucun résultat</h3>
                  <p>Aucun produit ne correspond à vos critères de recherche.</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative h-48 bg-gray-100">
                  {product.images.length > 0 ? (
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <Package className="h-12 w-12" />
                    </div>
                  )}
                  {product.featured && <Badge className="absolute top-2 left-2 bg-emh-red">Vedette</Badge>}
                  <Badge
                    className={`absolute top-2 right-2 ${
                      product.availability === "in-stock"
                        ? "bg-green-500"
                        : product.availability === "out-of-stock"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                    }`}
                  >
                    {product.availability === "in-stock"
                      ? "En stock"
                      : product.availability === "out-of-stock"
                        ? "Rupture"
                        : "Sur commande"}
                  </Badge>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">Réf: {product.reference}</p>

                  <Badge variant="outline" className="mb-3">
                    {getCategoryName(product.category)}
                  </Badge>

                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{product.description}</p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(product.id)} className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
