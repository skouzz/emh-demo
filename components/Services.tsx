"use client"

import { Zap, Wifi, Home, Factory } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Services() {
  const services = [
    {
      icon: Zap,
      title: "Installations Électriques",
      description: "Disjoncteurs, prises, tableaux électriques, câblage et mise aux normes électriques.",
      features: ["Tableaux électriques", "Prises et interrupteurs", "Éclairage professionnel", "Mise aux normes"],
    },
    {
      icon: Wifi,
      title: "Réseaux Informatiques",
      description: "Serveurs, Wi-Fi, armoires réseau et infrastructure informatique complète.",
      features: ["Installation serveurs", "Réseaux Wi-Fi", "Armoires de brassage", "Câblage structuré"],
    },
    {
      icon: Home,
      title: "Domotique & Smart Home",
      description: "Capteurs, éclairage intelligent, automatisation et maisons connectées.",
      features: ["Éclairage intelligent", "Capteurs automatiques", "Contrôle à distance", "Sécurité connectée"],
    },
    {
      icon: Factory,
      title: "Solutions Industrielles",
      description: "Automatismes, maintenance industrielle et solutions sur mesure.",
      features: ["Automatisation", "Maintenance préventive", "Solutions sur mesure", "Support technique"],
    },
  ]

  return (
    <section id="services" className="py-20 bg-emh-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-emh-black mb-4">
            Nos <span className="text-emh-red">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            EMH vous accompagne dans tous vos projets électriques et technologiques avec des solutions professionnelles
            et innovantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-emh-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emh-red rounded-full mb-4">
                  <service.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-emh-black mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-emh-red rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                className="w-full border-emh-red text-emh-red hover:bg-emh-red hover:text-white transition-all duration-200 bg-transparent"
              >
                En savoir plus
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
