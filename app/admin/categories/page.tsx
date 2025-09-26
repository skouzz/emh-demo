"use client"

import type React from "react"

import { useState } from "react"
import { Plus, CreditCard as Edit, Trash2, FolderOpen, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useProducts } from "@/hooks/use-products"
import type { ProductSubcategory } from "@/lib/db/models/product"
import Link from "next/link"

export default function AdminCategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useProducts()
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subcategories: [] as ProductSubcategory[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingCategory) {
      updateCategory(editingCategory, formData)
    } else {
      addCategory({
        name: formData.name,
        description: formData.description,
        subcategories: formData.subcategories,
      })
    }

    setShowForm(false)
    setEditingCategory(null)
    setFormData({ name: "", description: "", subcategories: [] })
  }

  const handleEdit = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId)
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        subcategories: category.subcategories,
      })
      setEditingCategory(categoryId)
      setShowForm(true)
    }
  }

  const handleDelete = (categoryId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      deleteCategory(categoryId)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Catégories</h1>
          <p className="text-gray-600">Organisez vos produits par catégories ({categories.length} catégories)</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/categories/import">
              <Upload className="h-4 w-4 mr-2" />
              Importer
            </Link>
          </Button>
          <Button onClick={() => setShowForm(true)} className="bg-emh-red hover:bg-red-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle Catégorie
          </Button>
        </div>
      </div>

      {/* Hint */}
      <Card className="mb-4">
        <CardContent className="text-sm text-gray-700 p-4">
          Astuce: pour importer rapidement, cliquez sur "Importer" puis collez votre liste. Chaque première ligne est
          considérée comme une catégorie et les lignes suivantes comme ses sous-catégories jusqu'à la prochaine
          catégorie. Les en-têtes comme "PRODUITS" ou "Close Menu" sont ignorés.
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <FolderOpen className="h-5 w-5 text-emh-red mr-2" />
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(category.id)} className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(category.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-3">{category.description}</p>
              <div className="text-xs text-gray-500">{category.subcategories.length} sous-catégories</div>
              {category.subcategories.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {category.subcategories.slice(0, 3).map((sub, index) => (
                    <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {typeof sub === "string" ? sub : sub.name}
                    </span>
                  ))}
                  {category.subcategories.length > 3 && (
                    <span className="text-xs text-gray-500">+{category.subcategories.length - 3} autres</span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">
              {editingCategory ? "Modifier la catégorie" : "Nouvelle catégorie"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la catégorie</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Interrupteurs et prises"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description de la catégorie..."
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-emh-red hover:bg-red-700">
                  {editingCategory ? "Modifier" : "Créer"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false)
                    setEditingCategory(null)
                    setFormData({ name: "", description: "", subcategories: [] })
                  }}
                  className="flex-1"
                >
                  Annuler
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
