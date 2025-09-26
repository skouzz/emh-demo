"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const services = [
    { name: "Installations Électriques", href: "/services/electrical" },
    { name: "Réseaux Informatiques", href: "/services/networks" },
    { name: "Domotique & Smart Home", href: "/services/smart-home" },
    { name: "Solutions Industrielles", href: "/services/industrial" },
  ]

  const products = [
    { name: "Interrupteurs & Prises", href: "/products/switches" },
    { name: "Tableaux Électriques", href: "/products/panels" },
    { name: "Domotique Connectée", href: "/products/smart" },
    { name: "Éclairage", href: "/products/lighting" },
  ]

  const quickLinks = [
    { name: "À propos", href: "/about" },
    { name: "Réalisations", href: "/projects" },
    { name: "Partenariat Legrand", href: "/legrand" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <footer className="bg-emh-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <Image
              src="/images/emh-logo.png"
              alt="EMH Logo"
              width={200}
              height={60}
              className="h-8 sm:h-12 w-auto filter brightness-0 invert"
            />
            <p className="text-gray-300 text-sm max-w-md leading-relaxed">
              EMH (Établissement Mohamed Hertilli) est votre partenaire de confiance pour toutes vos solutions
              électriques et technologiques en Tunisie. Revendeur agréé Legrand France.
            </p>
            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <Image
                src="/images/legrand-logo.png"
                alt="Legrand Logo"
                width={100}
                height={30}
                className="h-4 sm:h-6 w-auto filter brightness-0 invert"
              />
              <div>
                <p className="text-xs font-semibold text-emh-red">Revendeur agréé</p>
                <p className="text-xs text-gray-400">Partenaire agréé Legrand France</p>
              </div>
            </div>
            <div className="flex flex-col gap-1 pt-2">
              <a href="https://www.legrand.fr" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 underline hover:text-emh-red">Legrand France (legrand.fr)</a>
              <a href="https://www.legrand.tn" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 underline hover:text-emh-red">Legrand Tunisie (legrand.tn)</a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Nos Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-emh-red transition-colors duration-200 text-sm block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Produits</h3>
            <ul className="space-y-2">
              {products.map((product, index) => (
                <li key={index}>
                  <Link
                    href={product.href}
                    className="text-gray-300 hover:text-emh-red transition-colors duration-200 text-sm block"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Links */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-emh-red mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Rond point Globe Terrestre Route de ceinture<br />4081-Zaouiet Sousse</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone size={16} className="text-emh-red mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+216 XX XXX XXX</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail size={16} className="text-emh-red mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm break-all">contact@emh.tn</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm">Suivez-nous</h4>
              <div className="flex gap-3">
                <Link
                  href="#"
                  className="text-gray-300 hover:text-emh-red transition-colors duration-200 p-2 bg-gray-800 rounded-full"
                >
                  <Facebook size={16} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-emh-red transition-colors duration-200 p-2 bg-gray-800 rounded-full"
                >
                  <Instagram size={16} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-emh-red transition-colors duration-200 p-2 bg-gray-800 rounded-full"
                >
                  <Linkedin size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Établissement Mohamed Hertilli (EMH). Tous droits réservés.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-emh-red transition-colors duration-200 text-sm text-center"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-emh-red transition-colors duration-200 text-sm text-center"
              >
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
