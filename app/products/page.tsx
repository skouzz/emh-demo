"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, ArrowRight, Package, Grid, List } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useProducts } from "@/hooks/use-products"
import AddToCartButton from "@/components/cart/AddToCartButton"
import { useSearchParams, useRouter } from "next/navigation"
import { useAudience } from "@/hooks/use-audience"

export default function ProductsPage() {
  const { products, categories } = useProducts()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { audience } = useAudience()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Initialize from URL
  useEffect(() => {
    const urlCategory = searchParams.get("category") || ""
    if (urlCategory !== selectedCategory) {
      setSelectedCategory(urlCategory)
    }
  }, [searchParams])

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set("category", value)
    else params.delete("category")
    router.push(`/products?${params.toString()}`)
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      const matchesAudience =
        !product.audience || product.audience === "both" || product.audience === audience
      return matchesSearch && matchesCategory && matchesAudience
    })
  }, [products, searchQuery, selectedCategory, audience])

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || "Non catégorisé"
  }

  const getProductCount = (categoryId: string) => {
    return products.filter((p) => p.category === categoryId).length
  }

  return (
    <div className="min-h-screen bg-catalog-cream">
      <Header />

      {/* Audience Banner */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="text-sm">
            {audience === "pro" ? (
              <span className="font-medium text-catalog-dark">Espace Professionnel</span>
            ) : (
              <span className="font-medium text-catalog-dark">Espace Particulier</span>
            )}
            <span className="text-catalog-muted ml-2">
              {audience === "pro"
                ? "Catalogue détaillé, caractéristiques techniques et documents."
                : "Sélection claire et facile à comprendre pour vos achats."}
            </span>
          </div>
          <div className="hidden sm:block text-xs text-catalog-muted">
            {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Hero Section - Following design inspiration */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Image
                src="/images/legrand-logo.png"
                alt="Legrand"
                width={200}
                height={60}
                className="h-12 w-auto opacity-90"
              />
              <span className="text-3xl font-light text-catalog-muted">×</span>
              <Image src="/images/emh-logo.png" alt="EMH" width={160} height={48} className="h-10 w-auto opacity-90" />
            </div>

            <h1 className="catalog-heading text-5xl lg:text-7xl hero-text text-balance">
              Excellence électrique
              <br />
              <span className="text-catalog-accent">sans compromis</span>
            </h1>

            <p className="catalog-body text-xl lg:text-2xl text-catalog-muted max-w-4xl mx-auto text-balance">
              Découvrez notre collection complète de solutions Legrand. Chaque produit reflète 150 ans d'innovation
              française au service de vos projets.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-12">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-catalog-muted h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Rechercher par nom, référence ou description..."
                  className="pl-14 pr-6 py-4 w-full border-catalog-border rounded-2xl focus:border-catalog-accent focus:ring-catalog-accent bg-white/80 backdrop-blur-sm text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and View Controls */}
      <section className="py-8 bg-white border-b border-catalog-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-4 py-3 border border-catalog-border rounded-xl focus:outline-none focus:ring-2 focus:ring-catalog-accent bg-white min-w-[200px]"
              >
                <option value="">Toutes les catégories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({getProductCount(category.id)})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <span className="catalog-body text-catalog-muted">
                {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""}
              </span>

              <div className="flex items-center border border-catalog-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 transition-colors ${
                    viewMode === "grid" ? "bg-catalog-accent text-white" : "text-catalog-muted hover:bg-catalog-cream"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 transition-colors ${
                    viewMode === "list" ? "bg-catalog-accent text-white" : "text-catalog-muted hover:bg-catalog-cream"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <Card className="product-card">
              <CardContent className="text-center py-16">
                <div className="text-catalog-muted">
                  {products.length === 0 ? (
                    <>
                      <Package className="h-16 w-16 mx-auto mb-6 text-catalog-border" />
                      <h3 className="catalog-subheading text-2xl mb-4">Catalogue en préparation</h3>
                      <p className="catalog-body text-lg mb-8">
                        Notre équipe travaille actuellement à l'ajout de produits dans le catalogue.
                        <br />
                        Revenez bientôt pour découvrir notre gamme complète Legrand.
                      </p>
                      <Button asChild className="bg-catalog-accent hover:bg-catalog-accent/90 text-white">
                        <Link href="/contact">Nous contacter</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Search className="h-16 w-16 mx-auto mb-6 text-catalog-border" />
                      <h3 className="catalog-subheading text-2xl mb-4">Aucun résultat</h3>
                      <p className="catalog-body text-lg">
                        Aucun produit ne correspond à vos critères de recherche.
                        <br />
                        Essayez avec d'autres mots-clés ou contactez-nous pour plus d'informations.
                      </p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className={viewMode === "grid" ? "product-grid" : "space-y-6"}>
              {filteredProducts.map((product) => (
                <Card key={product.id} className="product-card group">
                  <CardContent className="p-0">
                    {viewMode === "grid" ? (
                      <>
                        {/* Product Image */}
                        <div className="relative h-64 bg-white">
                          {product.images.length > 0 ? (
                            <Image
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-catalog-border">
                              <Package className="h-16 w-16" />
                            </div>
                          )}

                          {/* Badges */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {product.featured && <Badge className="bg-catalog-accent text-white">Vedette</Badge>}
                            <Badge
                              variant="outline"
                              className={`${
                                product.availability === "in-stock"
                                  ? "border-green-500 text-green-700 bg-green-50"
                                  : product.availability === "out-of-stock"
                                    ? "border-red-500 text-red-700 bg-red-50"
                                    : "border-yellow-500 text-yellow-700 bg-yellow-50"
                              }`}
                            >
                              {product.availability === "in-stock"
                                ? "En stock"
                                : product.availability === "out-of-stock"
                                  ? "Rupture"
                                  : "Sur commande"}
                            </Badge>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-6 space-y-4">
                          <div>
                            <Badge variant="outline" className="mb-2">
                              {getCategoryName(product.category)}
                            </Badge>
                            <h3 className="catalog-subheading text-xl font-semibold text-catalog-dark line-clamp-2">
                              {product.name}
                            </h3>
                            <p className="catalog-technical text-catalog-muted">Réf: {product.reference}</p>
                          </div>

                          {audience === "pro" ? (
                            // Pro: show a few key characteristics
                            Object.keys(product.characteristics).length > 0 && (
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-catalog-dark">Caractéristiques:</h4>
                                <div className="flex flex-wrap gap-1">
                                  {Object.entries(product.characteristics)
                                    .slice(0, 4)
                                    .map(([key, value]) => (
                                      <Badge key={key} variant="secondary" className="text-xs">
                                        {key}: {value}
                                      </Badge>
                                    ))}
                                </div>
                              </div>
                            )
                          ) : (
                            // Particulier: shorter description snippet
                            <p className="text-sm text-catalog-muted line-clamp-2">
                              {product.description}
                            </p>
                          )}

                          <div className="flex items-center justify-between pt-4 border-t border-catalog-border">
                            {product.price && (
                              <span className="catalog-subheading text-lg font-semibold text-catalog-accent">
                                {product.price.toFixed(2)} DT
                              </span>
                            )}
                            <div className="flex gap-2">
                              <AddToCartButton product={product} size="sm" />
                              <Button asChild variant="outline" size="sm">
                                <Link href={`/products/${product.id}`}>
                                  Détails
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* List View */
                      <div className="flex gap-6 p-6">
                        <div className="relative w-32 h-32 bg-white rounded-lg flex-shrink-0">
                          {product.images.length > 0 ? (
                            <Image
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-contain p-2 rounded-lg"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-catalog-border">
                              <Package className="h-8 w-8" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline">{getCategoryName(product.category)}</Badge>
                                {product.featured && <Badge className="bg-catalog-accent text-white">Vedette</Badge>}
                              </div>
                              <h3 className="catalog-subheading text-xl font-semibold text-catalog-dark">
                                {product.name}
                              </h3>
                              <p className="catalog-technical text-catalog-muted">Réf: {product.reference}</p>
                            </div>

                            <div className="text-right">
                              {product.price && (
                                <span className="catalog-subheading text-lg font-semibold text-catalog-accent">
                                  {product.price.toFixed(2)} DT
                                </span>
                              )}
                              <Badge
                                variant="outline"
                                className={`block mt-1 ${
                                  product.availability === "in-stock"
                                    ? "border-green-500 text-green-700"
                                    : product.availability === "out-of-stock"
                                      ? "border-red-500 text-red-700"
                                      : "border-yellow-500 text-yellow-700"
                                }`}
                              >
                                {product.availability === "in-stock"
                                  ? "En stock"
                                  : product.availability === "out-of-stock"
                                    ? "Rupture"
                                    : "Sur commande"}
                              </Badge>
                            </div>
                          </div>

                          {audience === "pro" ? (
                            <div className="flex flex-wrap gap-1">
                              {Object.entries(product.characteristics)
                                .slice(0, 5)
                                .map(([key, value]) => (
                                  <Badge key={key} variant="secondary" className="text-xs">
                                    {key}: {value}
                                  </Badge>
                                ))}
                            </div>
                          ) : (
                            <p className="catalog-body text-catalog-muted line-clamp-2">{product.description}</p>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              <AddToCartButton product={product} size="sm" />
                              <Button asChild variant="outline" size="sm">
                                <Link href={`/products/${product.id}`}>
                                  Détails
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Overview */}
      {products.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="catalog-heading text-4xl lg:text-5xl text-catalog-dark mb-6">
                Explorez par <span className="text-catalog-accent">catégorie</span>
              </h2>
              <p className="catalog-body text-xl text-catalog-muted max-w-3xl mx-auto">
                Naviguez facilement dans notre gamme organisée selon vos besoins spécifiques
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => {
                const productCount = getProductCount(category.id)
                return (
                  <Card key={category.id} className="product-card group cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-catalog-cream rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-catalog-accent group-hover:text-white transition-colors">
                        <Package className="h-8 w-8" />
                      </div>
                      <h3 className="catalog-subheading text-lg font-semibold text-catalog-dark mb-2">
                        {category.name}
                      </h3>
                      <p className="catalog-body text-catalog-muted text-sm mb-4">{category.description}</p>
                      <Badge variant="outline" className="mb-4">
                        {productCount} produit{productCount !== 1 ? "s" : ""}
                      </Badge>
                      <Button
                        onClick={() => handleCategoryChange(category.id)}
                        variant="outline"
                        className="w-full border-catalog-accent text-catalog-accent hover:bg-catalog-accent hover:text-white"
                      >
                        Voir les produits
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
