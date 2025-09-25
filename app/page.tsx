"use client"

import { ArrowRight, Zap, Wifi, Home, Factory, Award, Users, Clock, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useProducts } from "@/hooks/use-products"

export default function HomePage() {
  const { products, getFeaturedProducts } = useProducts()
  const featuredProducts = getFeaturedProducts().slice(0, 3)

  const services = [
    {
      icon: Zap,
      title: "Installations Électriques",
      description: "Solutions complètes pour vos installations électriques résidentielles et commerciales",
      href: "/services/electrical",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Wifi,
      title: "Réseaux Informatiques",
      description: "Infrastructure réseau professionnelle pour entreprises et particuliers",
      href: "/services/networks",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Home,
      title: "Domotique & Smart Home",
      description: "Automatisation intelligente pour un confort optimal",
      href: "/services/smart-home",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Factory,
      title: "Solutions Industrielles",
      description: "Automatisation et maintenance pour l'industrie",
      href: "/services/industrial",
      color: "from-purple-500 to-pink-500",
    },
  ]

  const stats = [
    { icon: Users, label: "Clients satisfaits", value: "500+" },
    { icon: Clock, label: "Années d'expérience", value: "15+" },
    { icon: Award, label: "Projets réalisés", value: "1000+" },
    { icon: Shield, label: "Support 24/7", value: "Disponible" },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emh-white to-emh-gray py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8 animate-slide-in-left order-2 lg:order-1">
              <div className="space-y-4">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 flex-wrap">
                  <Image
                    src="/images/legrand-logo.png"
                    alt="Legrand"
                    width={220}
                    height={80}
                    className="h-16 sm:h-20 w-auto"
                  />
                  <span className="text-xs sm:text-sm font-medium text-gray-600">Distributeur Officiel Agréé</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emh-black leading-tight">
                  Solutions Électriques
                  <span className="text-emh-red"> Professionnelles</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  EMH, votre partenaire de confiance en Tunisie pour les installations électriques, la domotique, les
                  réseaux informatiques et les solutions industrielles.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  asChild
                  className="bg-emh-red hover:bg-red-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                  size="lg"
                >
                  <Link href="/services">
                    Découvrir nos services
                    <ArrowRight size={20} />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-emh-red text-emh-red hover:bg-emh-red hover:text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 bg-transparent"
                  size="lg"
                >
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>

            <div className="relative animate-slide-in-right order-1 lg:order-2">
              <div className="bg-gradient-to-r from-emh-red to-red-600 rounded-2xl p-6 sm:p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-4 sm:p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Système EMH actif</span>
                  </div>
                  {services.map((service, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm text-gray-600 truncate pr-2">{service.title}</span>
                        <span className="text-xs sm:text-sm font-semibold text-emh-red">{95 + index}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-emh-red h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${95 + index}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-emh-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-emh-red rounded-full mb-3 sm:mb-4">
                  <stat.icon className="text-white" size={24} />
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-emh-black mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-emh-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emh-black mb-4">
              Nos <span className="text-emh-red">Services</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              EMH vous accompagne dans tous vos projets avec des solutions professionnelles et innovantes
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${service.color} rounded-full mb-4`}
                  >
                    <service.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-emh-black mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{service.description}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="border-emh-red text-emh-red hover:bg-emh-red hover:text-white transition-all duration-200 bg-transparent w-full"
                  >
                    <Link href={service.href}>En savoir plus</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 lg:py-20 bg-emh-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emh-black mb-4">
              Produits <span className="text-emh-red">Vedettes</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {products.length > 0
                ? "Découvrez notre sélection de produits Legrand les plus populaires"
                : "Notre catalogue de produits Legrand sera bientôt disponible"}
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-0">
                    <div className="relative h-40 sm:h-48 bg-emh-gray">
                      {product.images.length > 0 ? (
                        <Image
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <Factory className="h-12 w-12" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-emh-red text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                          Legrand
                        </span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-emh-black mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                      <Button asChild className="w-full bg-emh-red hover:bg-red-700 text-white">
                        <Link href={`/products/${product.id}`}>Voir les détails</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Factory className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-600 mb-6">
                Notre équipe travaille actuellement à l'ajout de produits dans le catalogue.
              </p>
              <Button
                asChild
                variant="outline"
                className="border-emh-red text-emh-red hover:bg-emh-red hover:text-white bg-transparent"
              >
                <Link href="/admin">Accéder à l'administration</Link>
              </Button>
            </div>
          )}

          <div className="text-center mt-8 sm:mt-12">
            <Button
              asChild
              variant="outline"
              className="border-emh-red text-emh-red hover:bg-emh-red hover:text-white px-6 sm:px-8 py-3 rounded-lg font-semibold bg-transparent"
              size="lg"
            >
              <Link href="/products">Voir tous les produits</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Legrand Partnership */}
      <section className="py-12 sm:py-16 lg:py-20 bg-emh-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8 animate-slide-in-left">
              <div className="flex items-center gap-4">
                <Award className="h-8 w-8 sm:h-12 sm:w-12 text-emh-red flex-shrink-0" />
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emh-black">Partenaire Officiel</h2>
                  <p className="text-lg sm:text-xl text-gray-600 mt-2">Distributeur agréé Legrand en Tunisie</p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  EMH est fier d'être le{" "}
                  <strong className="text-emh-red">distributeur officiel agréé de Legrand France</strong> en Tunisie.
                  Cette partnership nous permet de vous offrir les meilleures solutions électriques et domotiques du
                  marché.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                    <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-emh-red flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-emh-black text-sm sm:text-base">Garantie Officielle</h3>
                      <p className="text-xs sm:text-sm text-gray-600">Produits authentiques</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                    <Users className="h-6 w-6 sm:h-8 sm:w-8 text-emh-red flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-emh-black text-sm sm:text-base">Support Expert</h3>
                      <p className="text-xs sm:text-sm text-gray-600">Formation spécialisée</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button asChild className="bg-emh-red hover:bg-red-700 text-white rounded-lg px-6 py-3">
                    <Link href="/legrand">En savoir plus</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-emh-black text-emh-black hover:bg-emh-black hover:text-white rounded-lg px-6 py-3 bg-transparent"
                  >
                    <Link href="/products">Catalogue Legrand</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <Card className="overflow-hidden shadow-2xl bg-white">
                <CardContent className="p-8 sm:p-12 text-center space-y-6 sm:space-y-8">
                  <Image
                    src="/images/legrand-logo.png"
                    alt="Legrand Official Partner"
                    width={400}
                    height={120}
                    className="mx-auto h-16 sm:h-24 w-auto"
                  />

                  <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-emh-black">Partenariat d'Excellence</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Plus de 150 ans d'innovation au service de vos projets électriques
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 sm:p-4 bg-emh-gray rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-emh-red">150+</div>
                      <div className="text-xs sm:text-sm text-gray-600">Ans d'expérience</div>
                    </div>
                    <div className="p-3 sm:p-4 bg-emh-gray rounded-lg">
                      <div className="text-xl sm:text-2xl font-bold text-emh-red">180</div>
                      <div className="text-xs sm:text-sm text-gray-600">Pays présents</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-emh-red text-white p-3 sm:p-4 rounded-full shadow-lg">
                <Award className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-emh-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Prêt à démarrer votre projet ?</h2>
            <p className="text-lg sm:text-xl text-red-100 max-w-3xl mx-auto">
              Contactez nos experts EMH. Nous vous accompagnons de A à Z dans la
              réalisation de vos projets électriques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-white text-emh-red hover:bg-gray-100 px-6 sm:px-8 py-3 rounded-lg font-semibold"
                size="lg"
              >
                <Link href="/contact">Nous contacter</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emh-red px-6 sm:px-8 py-3 rounded-lg font-semibold bg-transparent"
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
