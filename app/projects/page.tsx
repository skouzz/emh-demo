"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, User } from "lucide-react"
import { useState } from "react"

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const projects = [
    {
      id: 1,
      title: "Installation Électrique Villa Moderne",
      category: "Résidentiel",
      location: "Sidi Bou Said",
      date: "2024",
      client: "Famille Ben Ahmed",
      image: "/placeholder.svg?height=300&width=400",
      description: "Installation électrique complète avec domotique intégrée",
      services: ["Installation électrique", "Domotique", "Éclairage LED"],
    },
    {
      id: 2,
      title: "Réseau Informatique Entreprise",
      category: "Professionnel",
      location: "Tunis Centre",
      date: "2024",
      client: "TechCorp SARL",
      image: "/placeholder.svg?height=300&width=400",
      description: "Infrastructure réseau complète pour 50 postes de travail",
      services: ["Câblage réseau", "Wi-Fi professionnel", "Serveurs"],
    },
    {
      id: 3,
      title: "Automatisation Usine Textile",
      category: "Industriel",
      location: "Monastir",
      date: "2023",
      client: "TextilePro Industries",
      image: "/placeholder.svg?height=300&width=400",
      description: "Système d'automatisation pour ligne de production",
      services: ["Automatisation", "Supervision", "Maintenance"],
    },
    {
      id: 4,
      title: "Smart Home Appartement",
      category: "Smart Home",
      location: "La Marsa",
      date: "2024",
      client: "M. Trabelsi",
      image: "/placeholder.svg?height=300&width=400",
      description: "Transformation en appartement intelligent",
      services: ["Domotique MyHOME", "Éclairage intelligent", "Sécurité"],
    },
    {
      id: 5,
      title: "Tableau Électrique Hôtel",
      category: "Commercial",
      location: "Hammamet",
      date: "2023",
      client: "Hôtel Méditerranée",
      image: "/placeholder.svg?height=300&width=400",
      description: "Mise aux normes électriques complète",
      services: ["Tableaux XL³", "Protection", "Éclairage"],
    },
    {
      id: 6,
      title: "Système Sécurité Bureau",
      category: "Sécurité",
      location: "Sfax",
      date: "2024",
      client: "Cabinet d'Avocats",
      image: "/placeholder.svg?height=300&width=400",
      description: "Installation système de sécurité connecté",
      services: ["Caméras IP", "Contrôle d'accès", "Alarme"],
    },
  ]

  const categories = ["Tous", "Résidentiel", "Professionnel", "Industriel", "Smart Home", "Commercial", "Sécurité"]

  const filteredProjects = selectedCategory === "Tous"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emh-gray to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-emh-black mb-6">
              Nos <span className="text-emh-red">Réalisations</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Découvrez quelques-uns de nos projets réalisés avec succès pour nos clients. Plus de 1000 projets menés à
              bien depuis 15 ans.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`border-emh-red text-emh-red hover:bg-emh-red hover:text-white bg-transparent ${selectedCategory === category ? 'bg-emh-red text-white' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-emh-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-emh-red text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-emh-black mb-3">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{project.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={14} className="text-emh-red" />
                        {project.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={14} className="text-emh-red" />
                        {project.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User size={14} className="text-emh-red" />
                        {project.client}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {project.services.map((service, idx) => (
                          <span key={idx} className="bg-emh-gray text-gray-700 px-2 py-1 rounded text-xs font-medium">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-emh-red hover:bg-red-700 text-white">Voir les détails</Button>
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
            <h2 className="text-4xl font-bold text-white">Votre projet sera le prochain ?</h2>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Rejoignez nos clients satisfaits et confiez-nous la réalisation de votre projet électrique ou domotique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-white text-emh-red hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold"
                size="lg"
              >
                <Link href="/contact">Demander un devis</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emh-red px-8 py-3 rounded-lg font-semibold bg-transparent"
                size="lg"
              >
                <Link href="/services">Nos services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
