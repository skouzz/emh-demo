import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Shield, Award, CheckCircle, Phone } from "lucide-react"

export default function ElectricalServicesPage() {
  const services = [
    {
      title: "Tableaux Électriques",
      description: "Installation et maintenance de tableaux électriques conformes aux normes",
      features: [
        "Tableaux Legrand XL³ 160 et XL³ 4000",
        "Disjoncteurs modulaires et différentiels",
        "Parafoudres et protection surtension",
        "Mise aux normes NF C 15-100",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Prises et Interrupteurs",
      description: "Gamme complète Legrand pour tous vos besoins résidentiels et tertiaires",
      features: [
        "Céliane - Design et performance",
        "Mosaic - Modulaire et évolutif",
        "Niloe - Économique et fiable",
        "Prises USB et connectées",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Éclairage Professionnel",
      description: "Solutions d'éclairage LED et systèmes de gestion intelligente",
      features: [
        "Éclairage LED haute efficacité",
        "Détecteurs de présence",
        "Variateurs et gradateurs",
        "Éclairage de sécurité",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Câblage et Installation",
      description: "Câblage électrique complet pour tous types de bâtiments",
      features: [
        "Câblage résidentiel et tertiaire",
        "Gaines techniques et chemins de câbles",
        "Mise à la terre et liaisons équipotentielles",
        "Contrôle et certification",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const legrandProducts = [
    {
      name: "Disjoncteur DX³ 4500",
      category: "Protection",
      description: "Disjoncteur modulaire haute performance",
      features: ["Pouvoir de coupure 4,5kA", "Courbes B, C, D", "1P+N à 4P"],
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Interrupteur Céliane",
      category: "Appareillage",
      description: "Design moderne et finitions premium",
      features: ["Finitions métal et verre", "Éclairage LED", "Compatible domotique"],
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Tableau XL³ 160",
      category: "Tableaux",
      description: "Tableau électrique résidentiel",
      features: ["1 à 4 rangées", "Jusqu'à 72 modules", "Porte isolante"],
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const certifications = [
    "Certification Legrand Professional",
    "Habilitation électrique B1V, B2V, BR",
    "Formation sécurité électrique",
    "Agrément Consuel",
    "Certification ISO 9001",
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Service EMH</span>
                  <Image src="/images/legrand-logo.png" alt="Legrand" width={80} height={25} className="h-5 w-auto" />
                </div>
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-emh-black leading-tight mb-4">
                  Installations <span className="text-emh-red">Électriques</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Solutions complètes d'installation électrique pour résidentiel, tertiaire et industriel. Expertise
                  Legrand et conformité aux normes tunisiennes et européennes.
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
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6 space-y-4">
                  <h3 className="text-xl font-bold text-emh-black">Nos Garanties</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-emh-red" />
                      <span className="text-sm">Garantie 2 ans sur installations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-emh-red" />
                      <span className="text-sm">Produits Legrand authentiques</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emh-red" />
                      <span className="text-sm">Conformité normes NF C 15-100</span>
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
              Nos <span className="text-emh-red">Prestations</span> Électriques
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              EMH maîtrise l'ensemble des solutions électriques Legrand pour tous vos projets
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

      {/* Legrand Products */}
      <section className="py-20 bg-emh-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Image src="/images/legrand-logo.png" alt="Legrand" width={150} height={45} className="h-8 w-auto" />
              <span className="text-2xl font-bold text-emh-black">Produits Recommandés</span>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre sélection de produits Legrand pour vos installations électriques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {legrandProducts.map((product, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="relative h-32 mb-4 bg-emh-gray rounded-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="bg-emh-red text-white px-2 py-1 rounded text-xs font-semibold">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-emh-black">{product.name}</h3>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                    <ul className="space-y-1">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                          <div className="w-1 h-1 bg-emh-red rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-emh-red text-emh-red hover:bg-emh-red hover:text-white bg-transparent"
                    >
                      <Link href="/contact">Nous contacter</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-emh-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-emh-black mb-6">
                  Nos <span className="text-emh-red">Certifications</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  EMH dispose de toutes les certifications nécessaires pour garantir la qualité et la sécurité de nos
                  installations électriques. Nos techniciens sont formés aux dernières normes et technologies Legrand.
                </p>
              </div>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-emh-gray rounded-lg">
                    <CheckCircle className="h-6 w-6 text-emh-red flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{cert}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-emh-red hover:bg-red-700 text-white rounded-lg px-6 py-3">
                  <Link href="/about">En savoir plus</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-emh-black text-emh-black hover:bg-emh-black hover:text-white rounded-lg px-6 py-3 bg-transparent"
                >
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-emh-red to-red-600 text-white">
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <Award className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Expertise Certifiée</h3>
                    <p className="text-red-100">Plus de 15 ans d'expérience dans l'installation électrique</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-white/10 rounded-lg">
                      <div className="text-2xl font-bold">500+</div>
                      <div className="text-sm text-red-100">Installations réalisées</div>
                    </div>
                    <div className="p-4 bg-white/10 rounded-lg">
                      <div className="text-2xl font-bold">100%</div>
                      <div className="text-sm text-red-100">Conformité normes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-emh-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emh-black mb-6">
              Notre <span className="text-emh-red">Processus</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De l'étude de votre projet à la mise en service, EMH vous accompagne à chaque étape
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Étude & Conseil",
                description: "Analyse de vos besoins et proposition technique détaillée",
              },
              {
                step: "02",
                title: "Planification",
                description: "Organisation des travaux et approvisionnement matériel",
              },
              {
                step: "03",
                title: "Installation",
                description: "Réalisation par nos techniciens certifiés Legrand",
              },
              {
                step: "04",
                title: "Contrôle & SAV",
                description: "Tests, certification et service après-vente garanti",
              },
            ].map((item, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold text-emh-red">{item.step}</div>
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
            <h2 className="text-4xl font-bold text-white">Besoin d'une installation électrique ?</h2>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Nos experts EMH sont à votre disposition pour étudier votre projet électrique et vous proposer les
              meilleures solutions Legrand adaptées à vos besoins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-white text-emh-red hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold"
                size="lg"
              >
                <Link href="/contact">Nous contacter</Link>
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
