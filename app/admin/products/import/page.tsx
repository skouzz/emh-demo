"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useProducts } from "@/hooks/use-products"

export default function ImportProductsPage() {
  const { addProduct, refreshData } = useProducts()
  const [csv, setCsv] = useState("")
  const [audience, setAudience] = useState<"both" | "pro" | "particulier">("both")
  const [message, setMessage] = useState("")
  const [isImporting, setIsImporting] = useState(false)

  const parseCsv = (text: string) => {
    const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0)
    const rows = lines.map((l) => l.split(",").map((c) => c.trim()))
    return rows
  }

  const handleImport = async () => {
    setIsImporting(true)
    setMessage("")
    try {
      const rows = parseCsv(csv)
      let created = 0
      for (const row of rows) {
        // Columns: name,reference,price,categoryId,subcategoryId,description,imageUrls (| separated)
        const [name, reference, priceStr, category, subcategory, description, imageUrlsStr] = row
        const price = priceStr ? parseFloat(priceStr) : undefined
        const images = imageUrlsStr ? imageUrlsStr.split("|").map((s) => s.trim()).filter(Boolean) : []
        await addProduct({
          id: Date.now().toString() + Math.random(),
          name,
          reference,
          description: description || "",
          category,
          subcategory: subcategory || undefined,
          characteristics: {},
          technicalSpecs: {},
          images,
          technicalFiles: [],
          price,
          availability: "in-stock",
          featured: false,
          audience,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as any)
        created++
      }
      await refreshData()
      setMessage(`Import terminé: ${created} produits créés.`)
    } catch (e: any) {
      setMessage(e?.message || "Erreur d'import")
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Importer des produits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-700">
              Format CSV attendu (une ligne par produit, séparateur virgule):
              <pre className="bg-gray-100 p-2 rounded mt-2 overflow-auto">name,reference,price,categoryId,subcategoryId,description,imageUrls</pre>
              Exemple:
              <pre className="bg-gray-100 p-2 rounded mt-2 overflow-auto">Interrupteur simple,INT-001,12.5,cat-01-interrupteurs,cat-01-interrupteurs-01,Interrupteur 10A,"https://.../img1.jpg|https://.../img2.jpg"</pre>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">CSV</label>
                <Textarea rows={12} value={csv} onChange={(e) => setCsv(e.target.value)} placeholder="Collez votre CSV ici" />
              </div>
              <div className="w-64">
                <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
                <select className="w-full border rounded px-3 py-2" value={audience} onChange={(e) => setAudience(e.target.value as any)}>
                  <option value="both">both</option>
                  <option value="pro">pro</option>
                  <option value="particulier">particulier</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleImport} disabled={isImporting || !csv.trim()} className="bg-emh-red hover:bg-red-700 text-white">
                {isImporting ? "Import en cours..." : "Importer"}
              </Button>
              {message && <span className="text-sm text-gray-700">{message}</span>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 