import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wifi, Server, Shield, CheckCircle, Phone, Network } from "lucide-react"

export default function NetworkServicesPage() {
  const services = [
    {
      title: "Installation de Serveurs",
      description: "Configuration et installation de serveurs pour entreprises",
      features: [
        "Serveurs Windows et Linux",
        "Virtualisation VMware/Hyper-V",
        "Sauvegarde et récupération",
        "Monitoring et maintenance",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Réseaux Wi-Fi Professionnels",
      description: "Solutions Wi-Fi haute performance pour entreprises",
      features: ["Points d'accès Legrand", "Contrôleurs centralisés", "Sécurité WPA3", "Gestion des utilisateurs"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Câblage Structuré",
      description: "Infrastructure réseau complète et évolutive",
      features: ["Câblage Cat6/Cat6A", "Fibre optique", "Baies de brassage", "Certification des liens"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Sécurité Réseau",
      description: "Protection avancée de votre infrastructure",
      features: ["Pare-feu nouvelle génération", "VPN sécurisés", "Détection d'intrusion", "Audit de sécurité"],
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
                  <Wifi className="h-8 w-8 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Service EMH</span>
                  <Image src="/images/legrand-logo.png" alt="Legrand" width={80} height={25} className="h-5 w-auto" />
                </div>
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-emh-black leading-tight mb-4">
                  Réseaux <span className="text-emh-red">Informatiques</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Infrastructure réseau professionnelle pour entreprises, bureaux et espaces commerciaux. Solutions
                  complètes de câblage, Wi-Fi et sécurité réseau.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="bg-emh-red hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold"
                  size="lg"
                >
                  <Link href="/contact">Nous contacter</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-emh-black text-emh-black hover:bg-emh-black hover:text-white px-8 py-3 rounded-lg font-semibold bg-transparent"
                  size="lg"
                >
                  <Link href="tel:+216XXXXXXXX">
                    <Phone className="mr-2 h-4 w-4" />
                    Appeler maintenant
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6 space-y-4">
                  <h3 className="text-xl font-bold text-emh-black">Nos Expertises</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Server className="h-5 w-5 text-emh-red" />
                      <span className="text-sm">Infrastructure serveurs</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Network className="h-5 w-5 text-emh-red" />
                      <span className="text-sm">Câblage structuré</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-emh-red" />
                      <span className="text-sm">Sécurité réseau</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Details */}
      <section className="py-20 bg-emh-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emh-black mb-6">
              Nos <span className="text-emh-red">Services</span> Réseau
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Solutions complètes d'infrastructure réseau pour tous vos besoins professionnels
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-emh-black mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emh-red flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
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
