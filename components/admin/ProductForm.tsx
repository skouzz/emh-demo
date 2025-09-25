"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useProducts } from "@/hooks/use-products"
import FileUpload from "./FileUpload"

interface ProductFormProps {
  productId?: string | null
  onClose: () => void
}

export default function ProductForm({ productId, onClose }: ProductFormProps) {
  const { categories, addProduct, updateProduct, getProductById } = useProducts()
  const [formData, setFormData] = useState({
    name: "",
    reference: "",
    description: "",
    category: "",
    subcategory: "",
    characteristics: {} as Record<string, string>,
    technicalSpecs: {} as Record<string, string>,
    images: [] as string[],
    technicalFiles: [],
    price: "",
    availability: "in-stock" as const,
    featured: false,
  })

  const [newCharacteristic, setNewCharacteristic] = useState({ key: "", value: "" })
  const [newTechnicalSpec, setNewTechnicalSpec] = useState({ key: "", value: "" })
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [documentFiles, setDocumentFiles] = useState<File[]>([])

  useEffect(() => {
    if (productId) {
      const product = getProductById(productId)
      if (product) {
        setFormData({
          name: product.name,
          reference: product.reference,
          description: product.description,
          category: product.category,
          subcategory: product.subcategory || "",
          characteristics: product.characteristics,
          technicalSpecs: product.technicalSpecs,
          images: product.images,
          technicalFiles: product.technicalFiles,
          price: product.price?.toString() || "",
          availability: product.availability,
          featured: product.featured,
        })
      }
    }
  }, [productId, getProductById])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Convert uploaded files to URLs (in a real app, you'd upload to a server/CDN)
    const newImageUrls = imageFiles.map((file) => URL.createObjectURL(file))
    const newDocumentUrls = documentFiles.map((file) => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      type: file.name.split(".").pop()?.toLowerCase() as "pdf" | "doc" | "image",
      url: URL.createObjectURL(file),
      size: file.size,
    }))

    const productData = {
      ...formData,
      price: formData.price ? Number.parseFloat(formData.price) : undefined,
      images: [...formData.images, ...newImageUrls],
      technicalFiles: [...formData.technicalFiles, ...newDocumentUrls],
    }

    if (productId) {
      updateProduct(productId, productData)
    } else {
      addProduct(productData)
    }

    onClose()
  }

  const addCharacteristic = () => {
    if (newCharacteristic.key && newCharacteristic.value) {
      setFormData((prev) => ({
        ...prev,
        characteristics: {
          ...prev.characteristics,
          [newCharacteristic.key]: newCharacteristic.value,
        },
      }))
      setNewCharacteristic({ key: "", value: "" })
    }
  }

  const removeCharacteristic = (key: string) => {
    setFormData((prev) => {
      const newCharacteristics = { ...prev.characteristics }
      delete newCharacteristics[key]
      return { ...prev, characteristics: newCharacteristics }
    })
  }

  const addTechnicalSpec = () => {
    if (newTechnicalSpec.key && newTechnicalSpec.value) {
      setFormData((prev) => ({
        ...prev,
        technicalSpecs: {
          ...prev.technicalSpecs,
          [newTechnicalSpec.key]: newTechnicalSpec.value,
        },
      }))
      setNewTechnicalSpec({ key: "", value: "" })
    }
  }

  const removeTechnicalSpec = (key: string) => {
    setFormData((prev) => {
      const newSpecs = { ...prev.technicalSpecs }
      delete newSpecs[key]
      return { ...prev, technicalSpecs: newSpecs }
    })
  }

  const removeExistingImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const removeExistingDocument = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      technicalFiles: prev.technicalFiles.filter((_, i) => i !== index),
    }))
  }

  const selectedCategory = categories.find((c) => c.id === formData.category)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{productId ? "Modifier le produit" : "Nouveau produit"}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informations de base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nom du produit *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Référence *</label>
                  <Input
                    value={formData.reference}
                    onChange={(e) => setFormData((prev) => ({ ...prev, reference: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Catégorie *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value, subcategory: "" }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emh-red"
                    required
                  >
                    <option value="">Sélectionner...</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedCategory && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Sous-catégorie</label>
                    <select
                      value={formData.subcategory}
                      onChange={(e) => setFormData((prev) => ({ ...prev, subcategory: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emh-red"
                    >
                      <option value="">Sélectionner...</option>
                      {selectedCategory.subcategories.map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1">Disponibilité</label>
                  <select
                    value={formData.availability}
                    onChange={(e) => setFormData((prev) => ({ ...prev, availability: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emh-red"
                  >
                    <option value="in-stock">En stock</option>
                    <option value="out-of-stock">Rupture de stock</option>
                    <option value="on-order">Sur commande</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                    className="mr-2"
                  />
                  Produit vedette
                </label>
                <div className="flex-1 max-w-xs">
                  <label className="block text-sm font-medium mb-1">Prix (DT)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images du produit</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                accept="image/*"
                multiple={true}
                maxSize={5}
                onFilesChange={setImageFiles}
                existingFiles={formData.images}
                onRemoveExisting={removeExistingImage}
                label="Images"
                description="Ajoutez des images du produit (JPG, PNG, WebP)"
              />
            </CardContent>
          </Card>

          {/* Characteristics */}
          <Card>
            <CardHeader>
              <CardTitle>Caractéristiques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Caractéristique"
                  value={newCharacteristic.key}
                  onChange={(e) => setNewCharacteristic((prev) => ({ ...prev, key: e.target.value }))}
                />
                <Input
                  placeholder="Valeur"
                  value={newCharacteristic.value}
                  onChange={(e) => setNewCharacteristic((prev) => ({ ...prev, value: e.target.value }))}
                />
                <Button type="button" onClick={addCharacteristic}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {Object.entries(formData.characteristics).map(([key, value]) => (
                  <Badge key={key} variant="secondary" className="flex items-center gap-1">
                    {key}: {value}
                    <button type="button" onClick={() => removeCharacteristic(key)} className="ml-1 hover:text-red-600">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technical Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Spécifications Techniques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Spécification"
                  value={newTechnicalSpec.key}
                  onChange={(e) => setNewTechnicalSpec((prev) => ({ ...prev, key: e.target.value }))}
                />
                <Input
                  placeholder="Valeur"
                  value={newTechnicalSpec.value}
                  onChange={(e) => setNewTechnicalSpec((prev) => ({ ...prev, value: e.target.value }))}
                />
                <Button type="button" onClick={addTechnicalSpec}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {Object.entries(formData.technicalSpecs).map(([key, value]) => (
                  <Badge key={key} variant="outline" className="flex items-center gap-1">
                    {key}: {value}
                    <button type="button" onClick={() => removeTechnicalSpec(key)} className="ml-1 hover:text-red-600">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technical Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Documentation technique</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                accept=".pdf,.doc,.docx"
                multiple={true}
                maxSize={10}
                onFilesChange={setDocumentFiles}
                existingFiles={formData.technicalFiles.map((f) => f.name)}
                onRemoveExisting={removeExistingDocument}
                label="Documents"
                description="Ajoutez des fiches techniques, manuels, etc. (PDF, DOC)"
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-emh-red hover:bg-red-700">
              {productId ? "Mettre à jour" : "Créer le produit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
