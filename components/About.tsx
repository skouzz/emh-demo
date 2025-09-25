"use client"

import Image from "next/image"
import { Award, Users, Clock, Shield } from "lucide-react"

export default function About() {
  const stats = [
    { icon: Users, label: "Clients satisfaits", value: "500+" },
    { icon: Clock, label: "Années d'expérience", value: "15+" },
    { icon: Award, label: "Certifications", value: "10+" },
    { icon: Shield, label: "Garantie projets", value: "2 ans" },
  ]

  return (
    <section id="apropos" className="py-20 bg-emh-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-emh-black">
                À propos d'<span className="text-emh-red">EMH</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Établissement Mohamed Hertilli (EMH) est une entreprise tunisienne spécialisée dans les solutions
                électriques et technologiques depuis plus de 15 ans. Nous sommes fiers d'être le distributeur officiel
                agréé de Legrand France en Tunisie.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Notre expertise couvre les installations électriques, la domotique, les réseaux informatiques et les
                solutions industrielles. Nous accompagnons nos clients de la conception à la maintenance de leurs
                projets.
              </p>
            </div>

            <div className="flex items-center gap-4 p-4 bg-emh-gray rounded-lg">
              <Image src="/images/legrand-logo.png" alt="Legrand Logo" width={120} height={40} className="h-8 w-auto" />
              <div>
                <p className="font-semibold text-emh-black">Distributeur Officiel Agréé</p>
                <p className="text-sm text-gray-600">Partenaire certifié Legrand France</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-emh-gray rounded-xl hover:shadow-lg transition-shadow duration-200"
                >
                  <stat.icon className="mx-auto text-emh-red mb-3" size={32} />
                  <div className="text-2xl font-bold text-emh-black mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
