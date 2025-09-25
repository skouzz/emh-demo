"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Download, Share2, Heart, ShoppingCart, Package, FileText, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useProducts } from "@/hooks/use-products"
import AddToCartButton from "@/components/cart/AddToCartButton"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const { getProductById, getCategoryById } = useProducts()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const product = getProductById(productId)

  if (!product) {
    return (
      <div className="min-h-screen bg-catalog-cream">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="product-card">
            <CardContent className="text-center py-16">
              <Package className="h-16 w-16 mx-auto mb-6 text-catalog-border" />
              <h1 className="catalog-subheading text-2xl mb-4">Produit non trouvé</h1>
              <p className="catalog-body text-catalog-muted mb-8">
                Le produit que vous recherchez n'existe pas ou a été supprimé.
              </p>
              <Button asChild className="bg-catalog-accent hover:bg-catalog-accent/90 text-white">
                <Link href="/products">Retour au catalogue</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  const category = getCategoryById(product.category)

  return (
    <div className="min-h-screen bg-catalog-cream">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-catalog-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/products" className="text-catalog-muted hover:text-catalog-accent">
              Catalogue
            </Link>
            <span className="text-catalog-border">/</span>
            <Link
              href={`/products?category=${product.category}`}
              className="text-catalog-muted hover:text-catalog-accent"
            >
              {category?.name}
            </Link>
            <span className="text-catalog-border">/</span>
            <span className="text-catalog-dark font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <Card className="product-card overflow-hidden">
                <div className="relative h-96 bg-white">
                  {product.images.length > 0 ? (
                    <Image
                      src={product.images[selectedImage] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain p-8"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-catalog-border">
                      <Package className="h-24 w-24" />
                    </div>
                  )}
                </div>
              </Card>

              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 bg-white rounded-lg border-2 transition-colors ${
                        selectedImage === index ? "border-catalog-accent" : "border-catalog-border"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-contain p-2 rounded-lg"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline">{category?.name}</Badge>
                  {product.featured && <Badge className="bg-catalog-accent text-white">Produit vedette</Badge>}
                  <Badge
                    className={`${
                      product.availability === "in-stock"
                        ? "bg-green-100 text-green-800"
                        : product.availability === "out-of-stock"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {product.availability === "in-stock"
                      ? "En stock"
                      : product.availability === "out-of-stock"
                        ? "Rupture de stock"
                        : "Sur commande"}
                  </Badge>
                </div>

                <h1 className="catalog-heading text-4xl lg:text-5xl text-catalog-dark mb-4">{product.name}</h1>

                <p className="catalog-technical text-catalog-muted text-lg mb-6">Référence: {product.reference}</p>

                <p className="catalog-body text-xl text-catalog-muted leading-relaxed">{product.description}</p>
              </div>

              {product.price && (
                <div className="p-6 bg-white rounded-2xl border border-catalog-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="catalog-subheading text-3xl font-bold text-catalog-accent">
                        {product.price.toFixed(2)} DT
                      </span>
                      <p className="catalog-body text-catalog-muted">Prix TTC</p>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6 bg-white rounded-2xl border border-catalog-border">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      aria-label="Diminuer la quantité"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-catalog-dark hover:bg-catalog-cream"
                    >
                      -
                    </button>
                    <div className="px-4 py-2 min-w-[3rem] text-center font-medium">{quantity}</div>
                    <button
                      aria-label="Augmenter la quantité"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-2 text-catalog-dark hover:bg-catalog-cream"
                    >
                      +
                    </button>
                  </div>
                  <AddToCartButton product={product} quantity={quantity} className="flex-1" />
                </div>
              </div>

              <div className="flex gap-3">
                <Button asChild className="flex-1 bg-catalog-accent hover:bg-catalog-accent/90 text-white">
                  <Link href="/contact">
                    <Zap className="h-4 w-4 mr-2" />
                    Conseil technique
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="characteristics" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="characteristics">Caractéristiques</TabsTrigger>
                <TabsTrigger value="technical">Spécifications</TabsTrigger>
                <TabsTrigger value="documents">Documentation</TabsTrigger>
              </TabsList>

              <TabsContent value="characteristics" className="mt-8">
                <Card className="product-card">
                  <CardHeader>
                    <CardTitle className="catalog-subheading text-2xl">Caractéristiques principales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {Object.keys(product.characteristics).length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(product.characteristics).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center p-4 bg-catalog-cream rounded-lg">
                            <span className="catalog-body font-medium text-catalog-dark">{key}</span>
                            <span className="catalog-technical text-catalog-muted">{value}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="catalog-body text-catalog-muted text-center py-8">
                        Aucune caractéristique spécifiée pour ce produit.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="technical" className="mt-8">
                <Card className="product-card">
                  <CardHeader>
                    <CardTitle className="catalog-subheading text-2xl">Spécifications techniques</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {Object.keys(product.technicalSpecs).length > 0 ? (
                      <div className="space-y-4">
                        {Object.entries(product.technicalSpecs).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between items-center p-4 border-b border-catalog-border last:border-b-0"
                          >
                            <span className="catalog-body font-medium text-catalog-dark">{key}</span>
                            <span className="catalog-technical text-catalog-muted font-mono">{value}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="catalog-body text-catalog-muted text-center py-8">
                        Aucune spécification technique disponible pour ce produit.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-8">
                <Card className="product-card">
                  <CardHeader>
                    <CardTitle className="catalog-subheading text-2xl">Documentation technique</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {product.technicalFiles.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {product.technicalFiles.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between p-4 border border-catalog-border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="h-8 w-8 text-catalog-accent" />
                              <div>
                                <h4 className="catalog-body font-medium text-catalog-dark">{file.name}</h4>
                                <p className="catalog-technical text-catalog-muted">
                                  {file.type.toUpperCase()} • {(file.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={file.url} download>
                                <Download className="h-4 w-4 mr-2" />
                                Télécharger
                              </Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="h-16 w-16 mx-auto mb-4 text-catalog-border" />
                        <p className="catalog-body text-catalog-muted">
                          Aucun document technique disponible pour ce produit.
                        </p>
                        <Button asChild variant="outline" className="mt-4 bg-transparent">
                          <Link href="/contact">Demander la documentation</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
