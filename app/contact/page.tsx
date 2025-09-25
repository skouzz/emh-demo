import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, MessageCircle, Award } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-emh-gray to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emh-black mb-4 sm:mb-6">
              Contactez-<span className="text-emh-red">nous</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Vous avez un projet électrique ou domotique ? Nos experts EMH sont à votre disposition pour vous
              conseiller et vous accompagner dans la réalisation de vos projets.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 sm:py-16 lg:py-20 bg-emh-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <Card className="p-4 sm:p-6 lg:p-8">
              <CardContent className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-emh-black mb-4 sm:mb-6">
                    Contactez notre équipe
                  </h3>
                  <form className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-emh-black mb-2">
                          Prénom
                        </label>
                        <Input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          className="w-full border-gray-300 focus:border-emh-red focus:ring-emh-red"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-emh-black mb-2">
                          Nom
                        </label>
                        <Input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          className="w-full border-gray-300 focus:border-emh-red focus:ring-emh-red"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-emh-black mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full border-gray-300 focus:border-emh-red focus:ring-emh-red"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-emh-black mb-2">
                        Téléphone
                      </label>
                      <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full border-gray-300 focus:border-emh-red focus:ring-emh-red"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-emh-black mb-2">
                        Sujet
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        className="w-full border-gray-300 rounded-md focus:border-emh-red focus:ring-emh-red p-3 text-sm sm:text-base"
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="electrical">Installation électrique</option>
                        <option value="smart-home">Domotique & Smart Home</option>
                        <option value="networks">Réseaux informatiques</option>
                        <option value="industrial">Solutions industrielles</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-emh-black mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        placeholder="Décrivez votre projet..."
                        className="w-full border-gray-300 focus:border-emh-red focus:ring-emh-red"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-emh-red hover:bg-red-700 text-white py-3 font-semibold">
                      Envoyer la demande
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6 sm:space-y-8">
              <Card className="p-4 sm:p-6">
                <CardContent className="space-y-4 sm:space-y-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-emh-black">Informations de contact</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <MapPin className="text-emh-red mt-1 flex-shrink-0" size={20} />
                      <div>
                        <h4 className="font-semibold text-emh-black text-sm sm:text-base">Adresse</h4>
                        <p className="text-gray-600 text-sm">
                          Rond point Globe Terrestre Route de ceinture
                          <br />
                          4081-Zaouiet Sousse
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Phone className="text-emh-red mt-1 flex-shrink-0" size={20} />
                      <div>
                        <h4 className="font-semibold text-emh-black text-sm sm:text-base">Téléphone</h4>
                        <p className="text-gray-600 text-sm">+216 XX XXX XXX</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Mail className="text-emh-red mt-1 flex-shrink-0" size={20} />
                      <div>
                        <h4 className="font-semibold text-emh-black text-sm sm:text-base">Email</h4>
                        <p className="text-gray-600 text-sm break-all">contact@emh.tn</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <MessageCircle className="text-emh-red mt-1 flex-shrink-0" size={20} />
                      <div>
                        <h4 className="font-semibold text-emh-black text-sm sm:text-base">WhatsApp</h4>
                        <p className="text-gray-600 text-sm">+216 XX XXX XXX</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <iframe
                      title="EMH Location Map"
                      src="https://www.google.com/maps?q=Rond+point+Globe+Terrestre+Route+de+ceinture,+4081-Zaouiet+Sousse&output=embed"
                      width="100%"
                      height="250"
                      style={{ border: 0, borderRadius: '0.75rem', width: '100%' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4 sm:p-6">
                <CardContent className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-emh-black">Horaires d'ouverture</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Lundi - Vendredi</span>
                      <span className="font-medium">8h00 - 18h00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Samedi</span>
                      <span className="font-medium">8h00 - 13h00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Dimanche</span>
                      <span className="font-medium text-emh-red">Fermé</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4 sm:p-6 bg-emh-red text-white">
                <CardContent className="text-center space-y-4">
                  <Award className="mx-auto" size={40} />
                  <h3 className="text-lg sm:text-xl font-bold">Service d'urgence</h3>
                  <p className="text-red-100 text-sm">Disponible 24h/24 pour les interventions d'urgence</p>
                  <Button className="bg-white text-emh-red hover:bg-gray-100 w-full sm:w-auto">
                    Appeler maintenant
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
