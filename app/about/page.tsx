"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Clock, Shield, Target, Eye, Heart, Linkedin, Facebook } from "lucide-react"
import { useRef, useEffect, useState } from "react"

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

export default function AboutPage() {
  const stats = [
    { icon: Users, label: "Clients satisfaits", value: "10+" },
    { icon: Clock, label: "Années d'expérience", value: "20+" },
    { icon: Award, label: "Projets réalisés", value: "30+" },
    { icon: Shield, label: "Garantie projets", value: "2 ans" },
  ]

  const team = [
    {
      name: "Mohamed Hertilli",
      role: "Fondateur & Directeur Général",
      image: "/placeholder.svg?height=300&width=300",
      description: "Expert et Intégrateur de solution domotique avec plus de 20 ans d'expérience",
      linkedin: "",
      facebook: ""
    },
    {
      name: "Oussama Ben Mahmoud",
      role: "Directeur Technique",
      image: "/images/Oussama.png",
      description: "Ingénieur en Informatique, avec une expérience en électronique et systèmes embarqués",
      linkedin: "https://www.linkedin.com/in/oussamabenmahmoud/",
      facebook: "https://www.facebook.com/OussamaSkouZz/"
    },
    {
      name: "",
      role: "Responsable Commercial",
      image: "/placeholder.svg?height=300&width=300",
      description: "Experte en relation client et développement commercial",
      linkedin: "",
      facebook: ""
    },
  ]

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque projet, en utilisant les meilleures technologies Legrand.",
    },
    {
      icon: Shield,
      title: "Fiabilité",
      description: "Nos installations respectent les normes les plus strictes pour votre sécurité.",
    },
    {
      icon: Heart,
      title: "Satisfaction Client",
      description: "Votre satisfaction est notre priorité absolue, avec un service personnalisé.",
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
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl font-bold text-emh-black mb-6">
              À propos d'<span className="text-emh-red">EMH</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Établissement Mohamed Hertilli (EMH) est votre partenaire de confiance en Tunisie pour toutes vos
              solutions électriques et technologiques depuis plus de 15 ans.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-emh-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div>
                <h2 className="text-4xl font-bold text-emh-black mb-6">Notre Histoire</h2>
                <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                  <p>
                    Fondé en 2025 par Mohamed Hertilli, EMH a débuté comme une petite entreprise spécialisée dans les
                    installations électriques résidentielles. Grâce à notre engagement envers la qualité et
                    l'innovation, nous avons rapidement élargi nos services.
                  </p>
                  <p>
                    En 2025 nous sommes devenus revendeur agréé de Legrand France, marquant un tournant
                    décisif dans notre développement. Cette partnership nous a permis d'offrir à nos clients les
                    meilleures solutions électriques et domotiques du marché.
                  </p>
                  <p>
                    Aujourd'hui, EMH est reconnu comme un leader en Tunisie dans les domaines de l'électricité, de la
                    domotique, des réseaux informatiques et des solutions industrielles.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-emh-gray rounded-lg">
                <Image
                  src="/images/legrand-logo.png"
                  alt="Legrand Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
                <div>
                  <p className="font-semibold text-emh-black">Partenaire Officiel depuis 2025</p>
                  <p className="text-sm text-gray-600">Revendeur agréé Legrand France</p>
                </div>
              </div>
            </div>

            <div className="h-96 flex items-center justify-center">
  <div className="relative w-[600px] h-[400px]">
    <Image
      src="/images/emh-logo.png"
      alt="EMH Bureau"
      fill
      className="object-contain"
    />
  </div>
</div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-emh-gray" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emh-black mb-6">
              EMH en <span className="text-emh-red">Chiffres</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
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

      {/* Mission & Vision */}
      <section className="py-20 bg-emh-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8 bg-gradient-to-br from-emh-red to-red-600 text-white">
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Target className="h-12 w-12" />
                  <h3 className="text-3xl font-bold">Notre Mission</h3>
                </div>
                <p className="text-lg text-red-100 leading-relaxed">
                  Fournir des solutions électriques et technologiques innovantes, fiables et durables à nos clients en
                  Tunisie, en s'appuyant sur l'expertise Legrand et notre savoir-faire local.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-emh-black to-gray-800 text-white">
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Eye className="h-12 w-12" />
                  <h3 className="text-3xl font-bold">Notre Vision</h3>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Devenir le leader incontournable des solutions électriques intelligentes en Tunisie, en contribuant à
                  la transformation numérique des bâtiments et à l'efficacité énergétique.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-emh-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emh-black mb-6">
              Nos <span className="text-emh-red">Valeurs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les valeurs qui guident notre action quotidienne et notre relation avec nos clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-xl transition-all duration-300">
                <CardContent className="space-y-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-emh-red rounded-full">
                    <value.icon className="text-white" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-emh-black">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-emh-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emh-black mb-6">
              Notre <span className="text-emh-red">Équipe</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une équipe d'experts passionnés et qualifiés à votre service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative h-64">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-emh-black mb-2">{member.name}</h3>
                    <p className="text-emh-red font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-3">{member.description}</p>
                    <div className="flex justify-center gap-2">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-emh-red hover:text-emh-black font-medium" aria-label="LinkedIn">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {member.facebook && (
                        <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-emh-red hover:text-emh-black font-medium" aria-label="Facebook">
                          <Facebook className="h-5 w-5" />
                        </a>
                      )}
                    </div>
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
            <h2 className="text-4xl font-bold text-white">Rejoignez nos clients satisfaits</h2>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Faites confiance à l'expertise EMH et Legrand pour tous vos projets électriques et technologiques.
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
                <Link href="/services">Découvrir nos services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
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
