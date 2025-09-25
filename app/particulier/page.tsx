"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Sparkles, Hand } from "lucide-react"

export default function ParticulierLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="py-20 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Espace Particulier</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Des solutions claires et fiables pour votre maison. Découvrez les produits recommandés et faciles à choisir.
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild className="bg-emh-red hover:bg-red-700 text-white">
              <Link href="/particulier/catalogue">Découvrir le catalogue</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Besoin d'aide ?</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="h-5 w-5 text-emh-red" />
                <h3 className="font-semibold text-gray-900">Simple & clair</h3>
              </div>
              <p className="text-gray-600 text-sm">Descriptions faciles, conseils et choix recommandés.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="h-5 w-5 text-emh-red" />
                <h3 className="font-semibold text-gray-900">Design & qualité</h3>
              </div>
              <p className="text-gray-600 text-sm">Sélection de produits esthétiques et fiables.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Hand className="h-5 w-5 text-emh-red" />
                <h3 className="font-semibold text-gray-900">Accompagnement</h3>
              </div>
              <p className="text-gray-600 text-sm">Nous vous guidons jusqu'à l'achat et l'installation.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
} 