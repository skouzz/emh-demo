"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "Tous les produits" },
    { id: "switches", name: "Interrupteurs & Prises" },
    { id: "panels", name: "Tableaux Électriques" },
    { id: "smart", name: "Domotique Connectée" },
    { id: "industrial", name: "Solutions Industrielles" },
  ]

  const products = [
    {
      id: 1,
      name: "Interrupteur Legrand Céliane",
      category: "switches",
      image: "/placeholder.svg?height=200&width=200",
      description: "Interrupteur design avec finition premium",
      price: "Sur devis",
    },
    {
      id: 2,
      name: "Tableau Électrique 3 Rangées",
      category: "panels",
      image: "/placeholder.svg?height=200&width=200",
      description: "Tableau électrique modulaire 36 modules",
      price: "Sur devis",
    },
    {
      id: 3,
      name: "Détecteur de Mouvement Smart",
      category: "smart",
      image: "/placeholder.svg?height=200&width=200",
      description: "Capteur intelligent connecté",
      price: "Sur devis",
    },
    {
      id: 4,
      name: "Contacteur Industriel",
      category: "industrial",
      image: "/placeholder.svg?height=200&width=200",
      description: "Contacteur haute performance",
      price: "Sur devis",
    },
    {
      id: 5,
      name: "Prise USB Legrand",
      category: "switches",
      image: "/placeholder.svg?height=200&width=200",
      description: "Prise avec ports USB intégrés",
      price: "Sur devis",
    },
    {
      id: 6,
      name: "Éclairage LED Connecté",
      category: "smart",
      image: "/placeholder.svg?height=200&width=200",
      description: "Système d'éclairage intelligent",
      price: "Sur devis",
    },
  ]

  const filteredProducts =
    activeCategory === "all" ? products : products.filter((product) => product.category === activeCategory)

  return (
    <section id="produits" className="py-20 bg-emh-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-emh-black mb-4">
            Nos <span className="text-emh-red">Produits</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme complète de produits Legrand et solutions électriques professionnelles.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? "bg-emh-red text-white"
                  : "bg-emh-gray text-emh-black hover:bg-emh-red hover:text-white"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-emh-gray rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 bg-white">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-emh-black mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-emh-red">{product.price}</span>
                  <Button size="sm" className="bg-emh-red hover:bg-red-700 text-white">
                    En savoir plus
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
