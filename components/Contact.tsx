"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20 bg-emh-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-emh-black mb-4">
            Contactez-<span className="text-emh-red">nous</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Vous avez un projet ? N'hésitez pas à nous contacter, notre équipe vous répond rapidement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-emh-black mb-6">Envoyez-nous un message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-emh-black mb-2">
                    Nom complet
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-300 focus:border-emh-red focus:ring-emh-red"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-emh-black mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-300 focus:border-emh-red focus:ring-emh-red"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-emh-black mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full border-gray-300 focus:border-emh-red focus:ring-emh-red"
                  />
                </div>
                <Button type="submit" className="w-full bg-emh-red hover:bg-red-700 text-white py-3 font-semibold">
                  Envoyer le message
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-emh-black mb-6">Informations de contact</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-emh-red mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-emh-black">Adresse</h4>
                    <p className="text-gray-600">
                      Rond point Globe Terrestre Route de ceinture
                      <br />
                      4081-Zaouiet Sousse
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-emh-red mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-emh-black">Téléphone</h4>
                    <p className="text-gray-600">+216 XX XXX XXX</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-emh-red mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-emh-black">Email</h4>
                    <p className="text-gray-600">contact@emh.tn</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MessageCircle className="text-emh-red mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-emh-black">WhatsApp</h4>
                    <p className="text-gray-600">+216 XX XXX XXX</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-emh-gray rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto text-emh-red mb-2" size={48} />
                <p className="text-gray-600">Carte Google Maps</p>
                <p className="text-sm text-gray-500">Localisation EMH</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
