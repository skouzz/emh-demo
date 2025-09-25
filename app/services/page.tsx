import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Wifi, Home, Factory, ArrowRight, CheckCircle } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: Zap,
      title: "Installations Électriques",
      description:
        "Solutions complètes pour vos installations électriques résidentielles, commerciales et industrielles",
      features: [
        "Tableaux électriques et disjoncteurs",
        "Prises et interrupteurs Legrand",
        "Éclairage LED et solutions d'économie d'énergie",
        "Mise aux normes électriques",
        "Maintenance préventive et dépannage",
        "Certification et contrôle technique",
      ],
      href: "/services/electrical",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Wifi,
      title: "Réseaux Informatiques",
      description: "Infrastructure réseau professionnelle pour entreprises, bureaux et espaces commerciaux",
      features: [
        "Installation de serveurs et baies de brassage",
        "Réseaux Wi-Fi haute performance",
        "Câblage structuré et fibre optique",
        "Sécurité réseau et pare-feu",
        "Maintenance et support technique 24/7",
        "Solutions cloud et virtualisation",
      ],
      href: "/services/networks",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Home,
      title: "Domotique & Smart Home",
      description: "Automatisation intelligente pour un confort optimal et une gestion énergétique efficace",
      features: [
        "Éclairage intelligent et capteurs",
        "Contrôle climatisation et chauffage",
        "Systèmes de sécurité connectés",
        "Volets roulants automatisés",
        "Applications mobiles de contrôle",
        "Intégration vocale (Alexa, Google)",
      ],
      href: "/services/smart-home",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Factory,
      title: "Solutions Industrielles",
      description: "Automatisation et maintenance pour l'industrie, optimisation des processus de production",
      features: [
        "Automatisation de processus industriels",
        "Maintenance préventive et corrective",
        "Systèmes de contrôle et supervision",
        "Optimisation énergétique",
        "Formation et support technique",
        "Solutions sur mesure",
      ],
      href: "/services/industrial",
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emh-gray to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl font-bold text-emh-black mb-6">
              Nos <span className="text-emh-red">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              EMH vous accompagne dans tous vos projets électriques et technologiques avec des solutions
              professionnelles, innovantes et adaptées à vos besoins spécifiques.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-emh-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className={`p-4 rounded-full bg-gradient-to-r ${service.color} flex-shrink-0`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-emh-black mb-3">{service.title}</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                        <div className="space-y-3 mb-6">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-emh-red flex-shrink-0" />
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button asChild className="bg-emh-red hover:bg-red-700 text-white rounded-lg group">
                            <Link href={service.href}>
                              En savoir plus
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                            className="border-emh-black text-emh-black hover:bg-emh-black hover:text-white rounded-lg bg-transparent"
                          >
                            <Link href="/contact">Nous contacter</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose EMH */}
      <section className="py-20 bg-emh-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emh-black mb-6">
              Pourquoi choisir <span className="text-emh-red">EMH</span> ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre expertise et notre partenariat avec Legrand nous permettent de vous offrir les meilleures solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Expertise Reconnue",
                description: "Plus de 15 ans d'expérience dans le domaine électrique",
                number: "15+",
              },
              {
                title: "Partenaire Legrand",
                description: "Distributeur officiel agréé Legrand France",
                number: "100%",
              },
              {
                title: "Projets Réalisés",
                description: "Plus de 1000 projets menés à bien",
                number: "1000+",
              },
              {
                title: "Support Client",
                description: "Assistance technique disponible 24h/7j",
                number: "24/7",
              },
            ].map((item, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold text-emh-red">{item.number}</div>
                  <h3 className="text-xl font-bold text-emh-black">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emh-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white">Besoin d'une solution sur mesure ?</h2>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Nos experts EMH sont à votre disposition pour étudier votre projet et vous proposer la solution la plus
              adaptée à vos besoins et votre budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-white text-emh-red hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold"
                size="lg"
              >
                <Link href="/contact">Contactez nos experts</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emh-red px-8 py-3 rounded-lg font-semibold bg-transparent"
                size="lg"
              >
                <Link href="/projects">Voir nos réalisations</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
