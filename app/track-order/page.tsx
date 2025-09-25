"use client"

import type React from "react"

import { useState } from "react"
import { Search, Package, Truck, CheckCircle, Clock, AlertCircle, Calendar, User, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useOrders } from "@/hooks/use-orders"
import type { Order } from "@/types/order"
import OrderStatusBadge from "@/components/orders/OrderStatusBadge"
import PaymentStatusBadge from "@/components/orders/PaymentStatusBadge"

export default function TrackOrderPage() {
  const { getOrderByNumber } = useOrders()
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail] = useState("")
  const [order, setOrder] = useState<Order | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
    setError("")
    setOrder(null)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundOrder = getOrderByNumber(orderNumber)

    if (!foundOrder) {
      setError("Aucune commande trouvée avec ce numéro.")
    } else if (foundOrder.customerInfo.email.toLowerCase() !== email.toLowerCase()) {
      setError("L'email ne correspond pas à cette commande.")
    } else {
      setOrder(foundOrder)
    }

    setIsSearching(false)
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "confirmed":
        return <CheckCircle className="h-5 w-5 text-blue-600" />
      case "processing":
        return <Package className="h-5 w-5 text-purple-600" />
      case "shipped":
        return <Truck className="h-5 w-5 text-indigo-600" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "cancelled":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusSteps = (currentStatus: Order["status"]) => {
    const steps = [
      { key: "pending", label: "Commande reçue", description: "Votre commande a été enregistrée" },
      { key: "confirmed", label: "Confirmée", description: "Commande confirmée par notre équipe" },
      { key: "processing", label: "En préparation", description: "Préparation de votre commande" },
      { key: "shipped", label: "Expédiée", description: "Commande en cours de livraison" },
      { key: "delivered", label: "Livrée", description: "Commande livrée avec succès" },
    ]

    const statusOrder = ["pending", "confirmed", "processing", "shipped", "delivered"]
    const currentIndex = statusOrder.indexOf(currentStatus)

    return steps.map((step, index) => ({
      ...step,
      isCompleted: index <= currentIndex,
      isCurrent: index === currentIndex,
    }))
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Suivi de commande</h1>
          <p className="text-lg text-gray-600">
            Entrez votre numéro de commande et votre email pour suivre l'état de votre commande
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Rechercher votre commande
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Numéro de commande</label>
                  <Input
                    type="text"
                    placeholder="Ex: EMH-2024-001"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full bg-emh-red hover:bg-red-700 text-white" disabled={isSearching}>
                {isSearching ? "Recherche en cours..." : "Rechercher ma commande"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Order Details */}
        {order && (
          <div className="space-y-8">
            {/* Order Header */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Commande {order.orderNumber}</CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Passée le {formatDate(order.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="h-4 w-4" />
                        {order.items.length} article{order.items.length > 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <OrderStatusBadge status={order.status} />
                    <PaymentStatusBadge status={order.paymentStatus} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-gray-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Informations client</h4>
                      <p className="text-sm text-gray-600">{order.customerInfo.name}</p>
                      <p className="text-sm text-gray-600">{order.customerInfo.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-gray-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Contact</h4>
                      <p className="text-sm text-gray-600">{order.customerInfo.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Adresse de livraison</h4>
                      <p className="text-sm text-gray-600">{order.customerInfo.address}</p>
                      <p className="text-sm text-gray-600">{order.customerInfo.city}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Status Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Suivi de la commande</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {getStatusSteps(order.status).map((step, index) => (
                    <div key={step.key} className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          step.isCompleted
                            ? "bg-green-100 border-green-500 text-green-700"
                            : step.isCurrent
                              ? "bg-blue-100 border-blue-500 text-blue-700"
                              : "bg-gray-100 border-gray-300 text-gray-500"
                        }`}
                      >
                        {step.isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-current" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4
                          className={`font-medium ${
                            step.isCompleted || step.isCurrent ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {step.label}
                        </h4>
                        <p
                          className={`text-sm ${
                            step.isCompleted || step.isCurrent ? "text-gray-600" : "text-gray-400"
                          }`}
                        >
                          {step.description}
                        </p>
                        {step.isCurrent && order.estimatedDelivery && (
                          <p className="text-sm text-blue-600 mt-1">
                            Livraison estimée: {formatDate(order.estimatedDelivery)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Articles commandés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                        {item.productImage ? (
                          <Image
                            src={item.productImage || "/placeholder.svg"}
                            alt={item.productName}
                            fill
                            className="object-contain p-2 rounded-lg"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            <Package className="h-6 w-6" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.productName}</h4>
                        <p className="text-sm text-gray-600">Réf: {item.productReference}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-600">Quantité: {item.quantity}</span>
                          <span className="font-medium text-emh-red">{item.subtotal.toFixed(2)} DT</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Sous-total:</span>
                        <span>{order.subtotal.toFixed(2)} DT</span>
                      </div>
                      <div className="flex justify-between">
                        <span>TVA (18%):</span>
                        <span>{order.tax.toFixed(2)} DT</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-emh-red">{order.total.toFixed(2)} DT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            {(order.notes || order.customerInfo.notes) && (
              <Card>
                <CardHeader>
                  <CardTitle>Informations supplémentaires</CardTitle>
                </CardHeader>
                <CardContent>
                  {order.customerInfo.notes && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Notes du client:</h4>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{order.customerInfo.notes}</p>
                    </div>
                  )}
                  {order.notes && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Notes de la commande:</h4>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{order.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
