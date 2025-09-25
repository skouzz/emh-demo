"use client"

import Image from "next/image"

export default function Gallery() {
  const projects = [
    {
      id: 1,
      title: "Installation Électrique Résidentielle",
      category: "Résidentiel",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      title: "Réseau Informatique Entreprise",
      category: "Professionnel",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      title: "Domotique Maison Intelligente",
      category: "Smart Home",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 4,
      title: "Automatisation Industrielle",
      category: "Industriel",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 5,
      title: "Tableau Électrique Commercial",
      category: "Commercial",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 6,
      title: "Système de Sécurité Connecté",
      category: "Sécurité",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <section id="realisations" className="py-20 bg-emh-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-emh-black mb-4">
            Nos <span className="text-emh-red">Réalisations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez quelques-uns de nos projets réalisés avec succès pour nos clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                <span className="inline-block px-3 py-1 bg-emh-red text-white text-xs font-semibold rounded-full mb-2">
                  {project.category}
                </span>
                <h3 className="text-white font-bold text-lg">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
