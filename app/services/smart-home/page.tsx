import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Smartphone, Lightbulb, CheckCircle, Phone, Thermometer } from "lucide-react"

export default function SmartHomeServicesPage() {
  const services = [
    {
      title: "Éclairage Intelligent",
      description: "Contrôle automatique et personnalisé de l'éclairage",
      features: [
        "Variateurs connectés Legrand",
        "Détecteurs de présence",
        "Programmation horaire",
        "Contrôle par smartphone",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Gestion Climatique",
      description: "Optimisation du confort et des économies d'énergie",
      features: [
        "Thermostats intelligents",
        "Programmation multi-zones",
        "Détection de présence",
        "Reporting énergétique",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Sécurité Connectée",
      description: "Protection intelligente de votre domicile",
      features: ["Caméras IP connectées", "Détecteurs d'intrusion", "Contrôle d'accès", "Alertes en temps réel"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Volets Automatisés",
      description: "Gestion automatique des ouvertures",
      features: ["Moteurs Legrand", "Programmation solaire", "Capteurs météo", "Contrôle à distance"],
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                  <Home className="h-8 w-8 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Service EMH</span>
                  <Image src="/images/legrand-logo.png" alt="Legrand" width={80} height={25} className="h-5 w-auto" />
                </div>
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-emh-black leading-tight mb-4">
                  Domotique & <span className="text-emh-red">Smart Home</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Automatisation intelligente pour un confort optimal et une gestion énergétique efficace. Solutions
                  Legrand MyHOME et Céliane with Netatmo.
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
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6 space-y-4">
                  <h3 className="text-xl font-bold text-emh-black">Solutions Smart</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Lightbulb className="h-5 w-5 text-emh-red" />
                      <span className="text-sm">Éclairage intelligent</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Thermometer className="h-5 w-5 text-emh-red" />
                      <span className="text-sm">Contrôle climatique</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-emh-red" />
                      <span className="text-sm">Application mobile</span>
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
              Solutions <span className="text-emh-red">Domotiques</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transformez votre maison en habitat intelligent avec les solutions Legrand
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
