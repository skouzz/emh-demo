"use client"
import { useRef, useEffect, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Globe, Users, Zap, CheckCircle, Star } from "lucide-react"

function useInView(ref: React.RefObject<HTMLDivElement>) {
  const [isIntersecting, setIntersecting] = useState(false)
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return isIntersecting
}

function AnimatedCount({ value, inView }: { value: number; inView: boolean }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) {
      setCount(0)
      return
    }
    let start = 0
    const end = value
    if (start === end) return
    let duration = 1200
    let increment = end / (duration / 16)
    let raf: number
    function animate() {
      start += increment
      if (start < end) {
        setCount(Math.floor(start))
        raf = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }
    animate()
    return () => cancelAnimationFrame(raf)
  }, [inView, value])
  return <div className="text-3xl font-bold text-emh-black">{count}+</div>
}

export default function LegrandPage() {
  const legrandStats = [
    { icon: Globe, label: "Pays présents", value: "180" },
    { icon: Users, label: "Collaborateurs", value: "38,000" },
    { icon: Zap, label: "Années d'expérience", value: "150+" },
    { icon: Award, label: "Brevets déposés", value: "6,000+" },
  ]

  const advantages = [
    {
      title: "Produits Authentiques",
      description: "Garantie d'authenticité sur tous les produits Legrand distribués par EMH",
      icon: Award,
    },
    {
      title: "Support Technique",
      description: "Équipe EMH formée et certifiée par Legrand pour vous accompagner",
      icon: Users,
    },
    {
      title: "Stock Permanent",
      description: "Disponibilité immédiate des produits les plus demandés",
      icon: CheckCircle,
    },
    {
      title: "Formation Continue",
      description: "Mise à jour régulière sur les nouveautés et innovations Legrand",
      icon: Star,
    },
  ]

  const statsRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement)
  const statsInView = useInView(statsRef)

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emh-gray to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div className="flex items-center gap-4">
                <Image src="/images/emh-logo.png" alt="EMH" width={200} height={60} className="h-16 w-auto" />
                <span className="text-3xl font-bold text-emh-black">×</span>
                <Image src="/images/legrand-logo.png" alt="Legrand" width={250} height={75} className="h-20 w-auto" />
              </div>

              <div>
                <Image
                  src="/images/legrand-logo.png"
                  alt="Legrand"
                  width={350}
                  height={120}
                  className="mb-4 h-24 w-auto"
                />
                <h1 className="text-4xl md:text-5xl font-bold text-emh-black leading-tight mb-4">
                  Partenariat <span className="text-emh-red">d'Excellence</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-2">
                  EMH est fier d'être le revendeur agréé de Legrand France en Tunisie. Cette partnership
                  stratégique nous permet de vous offrir les meilleures solutions électriques et domotiques du marché
                  mondial.
                </p>
                <p className="text-sm text-gray-500">
                  Référence :{' '}
                  <a href="https://www.legrand.fr" target="_blank" rel="noopener noreferrer" className="underline hover:text-emh-red">
                    Site officiel Legrand France
                  </a>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="bg-emh-red hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold"
                  size="lg"
                >
                  <Link href="/products">Catalogue Legrand</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-emh-black text-emh-black hover:bg-emh-black hover:text-white px-8 py-3 rounded-lg font-semibold bg-transparent"
                  size="lg"
                >
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <Card className="overflow-hidden shadow-2xl bg-gradient-to-br from-emh-red to-red-600 text-white">
                <CardContent className="p-8 text-center space-y-6">
                  <Award className="mx-auto" size={64} />
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Revendeur agréé</h3>
                    <p className="text-red-100">
                      Certification officielle Legrand France pour la distribution en Tunisie
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-sm">Partenariat depuis</p>
                    <p className="text-3xl font-bold">2025</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Legrand Stats */}
      <section className="py-20 bg-emh-white" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Image
              src="/images/legrand-logo.png"
              alt="Legrand"
              width={350}
              height={120}
              className="mx-auto mb-6 h-24 w-auto"
            />
            <h2 className="text-4xl font-bold text-emh-black mb-6">
              Legrand en <span className="text-emh-red">Chiffres</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leader mondial des infrastructures électriques et numériques du bâtiment
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {legrandStats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emh-red rounded-full">
                    <stat.icon className="text-white" size={32} />
                  </div>
                  <AnimatedCount value={parseInt(stat.value)} inView={statsInView} />
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Advantages */}
      <section className="py-20 bg-emh-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emh-black mb-6">
              Avantages du <span className="text-emh-red">Partenariat</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pourquoi choisir EMH comme votre fournisseur Legrand en Tunisie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-xl transition-all duration-300">
                <CardContent className="space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emh-red rounded-full">
                    <advantage.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-emh-black">{advantage.title}</h3>
                  <p className="text-gray-600 text-sm">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-emh-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emh-black mb-6">
              Gammes <span className="text-emh-red">Legrand</span> Disponibles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez l'ensemble des solutions Legrand disponibles chez EMH
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Céliane",
                description: "Gamme design premium pour l'habitat résidentiel",
                image: "/placeholder.svg?height=200&width=300",
                href: "/products/switches",
              },
              {
                name: "XL³",
                description: "Tableaux électriques haute performance",
                image: "/placeholder.svg?height=200&width=300",
                href: "/products/panels",
              },
              {
                name: "MyHOME",
                description: "Solutions domotiques intégrées",
                image: "/placeholder.svg?height=200&width=300",
                href: "/products/smart",
              },
              {
                name: "CTX³",
                description: "Solutions industrielles et tertiaires",
                image: "/placeholder.svg?height=200&width=300",
                href: "/products/industrial",
              },
              {
                name: "DX³",
                description: "Protection électrique modulaire",
                image: "/placeholder.svg?height=200&width=300",
                href: "/products/protection",
              },
              {
                name: "Mosaic",
                description: "Appareillage modulaire évolutif",
                image: "/placeholder.svg?height=200&width=300",
                href: "/products/switches",
              },
            ].map((product, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-emh-black mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <Button asChild className="w-full bg-emh-red hover:bg-red-700 text-white">
                      <Link href={product.href}>Découvrir la gamme</Link>
                    </Button>
                  </div>
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
            <h2 className="text-4xl font-bold text-white">Profitez de l'expertise Legrand × EMH</h2>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Bénéficiez de la qualité Legrand et du service EMH pour tous vos projets électriques et domotiques en
              Tunisie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-white text-emh-red hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold"
                size="lg"
              >
                <Link href="/products">Voir le catalogue</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emh-red px-8 py-3 rounded-lg font-semibold bg-transparent"
                size="lg"
              >
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
