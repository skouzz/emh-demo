"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Package, ShieldCheck } from "lucide-react"

export default function ProLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="py-20 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Espace Professionnel</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Accédez à des fiches techniques complètes, caractéristiques détaillées, et un accompagnement dédié pour vos
            projets.
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild className="bg-emh-red hover:bg-red-700 text-white">
              <Link href="/pro/catalogue">Ouvrir le catalogue Pro</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Parler à un expert</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="h-5 w-5 text-emh-red" />
                <h3 className="font-semibold text-gray-900">Documentation technique</h3>
              </div>
              <p className="text-gray-600 text-sm">Fiches techniques, schémas, notices, certificats...</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Package className="h-5 w-5 text-emh-red" />
                <h3 className="font-semibold text-gray-900">Détails produits avancés</h3>
              </div>
              <p className="text-gray-600 text-sm">Caractéristiques complètes, références, compatibilités.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="h-5 w-5 text-emh-red" />
                <h3 className="font-semibold text-gray-900">Support prioritaire</h3>
              </div>
              <p className="text-gray-600 text-sm">Assistance dédiée pour vos chantiers et déploiements.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
} 