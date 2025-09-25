"use client"
import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Shield, Zap, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function PanelsPage() {
  const [search, setSearch] = useState("");
  const products = [
    {
      name: "XL³ 160 - 1 rangée",
      series: "XL³ 160",
      modules: "18 modules",
      price: "Sur devis",
      rating: 5,
      image: "/placeholder.svg?height=200&width=200",
      features: ["Porte isolante", "Borniers à vis", "Peigne d'alimentation"],
      badge: "Résidentiel",
    },
    {
      name: "XL³ 160 - 3 rangées",
      series: "XL³ 160",
      modules: "54 modules",
      price: "Sur devis",
      rating: 5,
      image: "/placeholder.svg?height=200&width=200",
      features: ["Porte isolante", "Borniers à vis", "Peigne d'alimentation"],
      badge: "Bestseller",
    },
    {
      name: "XL³ 4000 - 4 rangées",
      series: "XL³ 4000",
      modules: "72 modules",
      price: "Sur devis",
      rating: 5,
      image: "/placeholder.svg?height=200&width=200",
      features: ["Haute performance", "Borniers automatiques", "Accessoires intégrés"],
      badge: "Professionnel",
    },
  ]

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.series.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emh-gray to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Image src="/images/legrand-logo.png" alt="Legrand" width={150} height={45} className="h-10 w-auto" />
              <span className="text-2xl font-bold text-emh-black">Tableaux Électriques</span>
            </div>
            <h1 className="text-5xl font-bold text-emh-black mb-6">
              Gamme <span className="text-emh-red">XL³</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Tableaux électriques Legrand XL³ 160 et XL³ 4000. Performance, sécurité et facilité d'installation pour
              tous vos projets résidentiels et tertiaires.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Rechercher un produit..."
              className="pl-12 pr-4 py-3 w-full border-gray-300 rounded-lg focus:border-emh-red focus:ring-emh-red"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Button className="bg-emh-red hover:bg-red-700 text-white px-6 py-3 rounded-lg">
            <Filter size={16} className="mr-2" />
            Filtrer
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-20 bg-emh-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="relative h-64 bg-emh-gray">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover p-4"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.badge === "Professionnel"
                            ? "bg-purple-500 text-white"
                            : product.badge === "Bestseller"
                              ? "bg-yellow-500 text-white"
                              : "bg-emh-red text-white"
                        }`}
                      >
                        {product.badge}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white rounded-full p-2">
                      <Shield className="h-4 w-4 text-emh-red" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-emh-red font-semibold">{product.series}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                          />
                        ))}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-emh-black mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="h-4 w-4 text-emh-red" />
                      <span className="text-sm font-medium text-gray-700">{product.modules}</span>
                    </div>
                    <ul className="space-y-1 mb-4">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                          <div className="w-1 h-1 bg-emh-red rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-emh-red">{product.price}</span>
                      <Button size="sm" className="bg-emh-red hover:bg-red-700 text-white" asChild>
                        <Link href="/contact">Devis</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
