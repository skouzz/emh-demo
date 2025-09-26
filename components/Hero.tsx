"use client"

import { ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section id="accueil" className="bg-gradient-to-br from-emh-white to-emh-gray py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-emh-black leading-tight">
                Solutions Électriques
                <span className="text-emh-red"> Professionnelles</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                EMH, votre partenaire de confiance en Tunisie pour les installations électriques, la domotique, les
                réseaux informatiques et les solutions industrielles. Revendeur agréé Legrand France.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-emh-red hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
                size="lg"
              >
                Découvrir nos services
                <ArrowRight size={20} />
              </Button>
              <Button
                variant="outline"
                className="border-emh-red text-emh-red hover:bg-emh-red hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 bg-transparent"
                size="lg"
              >
                Nous contacter
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                <Zap className="text-emh-red" size={24} />
                <span className="text-sm font-medium text-gray-700">Revendeur agréé Legrand</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-r from-emh-red to-red-600 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Système actif</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Installations électriques</span>
                    <span className="text-sm font-semibold text-emh-red">98%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emh-red h-2 rounded-full" style={{ width: "98%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Domotique & Smart Home</span>
                    <span className="text-sm font-semibold text-emh-red">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emh-red h-2 rounded-full" style={{ width: "95%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Réseaux informatiques</span>
                    <span className="text-sm font-semibold text-emh-red">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emh-red h-2 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
