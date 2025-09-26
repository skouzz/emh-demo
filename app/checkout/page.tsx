"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, CreditCard, Truck, Shield, Package } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useCart } from "@/hooks/use-cart"
import { useOrders } from "@/hooks/use-orders"
import { useRouter } from "next/navigation"
import type { Product } from "@/lib/types"

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const { createOrder } = useOrders()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const order = await createOrder(customerInfo, cart.items)

      // Clear cart and redirect to success page with order number
      clearCart()
      router.push(`/order-success?orderNumber=${order.orderNumber}`)
    } catch (error) {
      console.error("Error creating order:", error)
      // Handle error - could show toast notification
      alert("Erreur lors de la création de la commande. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Panier vide</h1>
          <p className="text-gray-600 mb-8">Votre panier est vide. Ajoutez des produits pour passer une commande.</p>
          <Button asChild className="bg-emh-red hover:bg-red-700 text-white">
            <Link href="/products">Voir les produits</Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button asChild variant="outline">
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux produits
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Informations de commande</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Nom complet *</label>
                      <Input
                        value={customerInfo.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email *</label>
                      <Input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Téléphone *</label>
                    <Input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Adresse *</label>
                    <Input
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Ville *</label>
                      <Input
                        value={customerInfo.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Code postal</label>
                      <Input
                        value={customerInfo.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Notes (optionnel)</label>
                    <Textarea
                      value={customerInfo.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      rows={3}
                      placeholder="Instructions spéciales, préférences de livraison, etc."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-emh-red hover:bg-red-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Traitement en cours..." : "Confirmer la commande"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Payment & Delivery Info */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <CreditCard className="h-8 w-8 mx-auto mb-2 text-emh-red" />
                  <h3 className="font-medium text-sm">Paiement</h3>
                  <p className="text-xs text-gray-600">À la livraison</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Truck className="h-8 w-8 mx-auto mb-2 text-emh-red" />
                  <h3 className="font-medium text-sm">Livraison</h3>
                  <p className="text-xs text-gray-600">2-5 jours ouvrés</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-emh-red" />
                  <h3 className="font-medium text-sm">Garantie</h3>
                  <p className="text-xs text-gray-600">Produits Legrand</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Récapitulatif de commande</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                        {item.product.images.length > 0 ? (
                          <Image
                            src={item.product.images[0] || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-contain p-1 rounded-lg"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            <Package className="h-6 w-6" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 line-clamp-2">{item.product.name}</h4>
                        <p className="text-sm text-gray-600">Réf: {item.product.reference}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm">Quantité: {item.quantity}</span>
                          {item.product.price && (
                            <span className="font-medium text-emh-red">
                              {(item.product.price * item.quantity).toFixed(2)} DT
                            </span>
                          )}
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Sous-total:</span>
                      <span>{cart.total.toFixed(2)} DT</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>TVA (18%):</span>
                      <span>{(cart.total * 0.18).toFixed(2)} DT</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                      <span>Total:</span>
                      <span className="text-emh-red">{(cart.total * 1.18).toFixed(2)} DT</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
