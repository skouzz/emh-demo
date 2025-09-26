"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useProducts } from "@/hooks/use-products"

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export default function ImportCategoriesPage() {
  const router = useRouter()
  const { addCategory, refreshData } = useProducts()
  const [text, setText] = useState("")
  const [baseIdPrefix, setBaseIdPrefix] = useState("cat")
  const [isImporting, setIsImporting] = useState(false)
  const [message, setMessage] = useState("")

  const parse = (raw: string) => {
    const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0)
    const categories: { name: string; sub: string[] }[] = []
    let current: { name: string; sub: string[] } | null = null

    for (const line of lines) {
      // Skip obvious headers
      if (/^produits?$/i.test(line) || /close menu/i.test(line)) continue

      // Heuristic: treat lines ending with none of punctuation and in Title Case as category if no current
      if (!current) {
        current = { name: line, sub: [] }
        categories.push(current)
        continue
      }

      // If line looks like a new category (no comma and not long descriptive sentence), start new
      if (/^[A-ZÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸ]/.test(line) && line.length < 80 && current.sub.length > 0 && !/[:]/.test(line)) {
        current = { name: line, sub: [] }
        categories.push(current)
      } else {
        current.sub.push(line)
      }
    }

    return categories
  }

  const handleImport = async () => {
    setIsImporting(true)
    setMessage("")
    try {
      const parsed = parse(text)
      let catIndex = 1
      for (const cat of parsed) {
        const catId = `${baseIdPrefix}-${String(catIndex).padStart(2, "0")}-${slugify(cat.name)}`
        await addCategory({
          id: catId,
          name: cat.name,
          description: "",
          subcategories: cat.sub.map((s, i) => ({ id: `${catId}-${String(i + 1).padStart(2, "0")}`, name: s, description: "" })),
          createdAt: new Date(),
          updatedAt: new Date(),
        } as any)
        catIndex++
      }
      await refreshData()
      setMessage(`Import terminé: ${parsed.length} catégories créées.`)
    } catch (e: any) {
      setMessage(e?.message || "Erreur lors de l'import")
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Importer des catégories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Liste à importer</label>
                <Textarea rows={14} value={text} onChange={(e) => setText(e.target.value)} placeholder="Collez votre liste ici (chaque ligne)" />
              </div>
              <div className="w-56">
                <label className="block text-sm font-medium text-gray-700 mb-1">Préfixe d'ID</label>
                <Input value={baseIdPrefix} onChange={(e) => setBaseIdPrefix(e.target.value)} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleImport} disabled={isImporting || !text.trim()} className="bg-emh-red hover:bg-red-700 text-white">
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