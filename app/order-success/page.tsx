"use client"

import { useEffect, useState } from "react"
import { CircleCheck as CheckCircle, ArrowRight, Package, Calendar, User } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useOrders } from "@/hooks/use-orders"
import type { Order } from "@/lib/db/models/order"
import OrderStatusBadge from "@/components/orders/OrderStatusBadge"

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("orderNumber")
  const { getOrderByNumber } = useOrders()
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (orderNumber) {
      const foundOrder = getOrderByNumber(orderNumber)
      setOrder(foundOrder || null)
    }
  }, [orderNumber, getOrderByNumber])

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

      <div className="max-w-4xl mx-auto px-4 py-16">
        <Card>
          <CardContent className="p-12 text-center">
            <CheckCircle className="h-16 w-16 mx-auto mb-6 text-green-500" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Commande confirmée!</h1>

            {order ? (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Commande #{order.orderNumber}</h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-600" />
                      <span>Créée le {formatDate(order.createdAt)}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Package className="h-4 w-4 text-gray-600" />
                      <span>
                        {order.items.length} article{order.items.length > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <User className="h-4 w-4 text-gray-600" />
                      <OrderStatusBadge status={order.status} />
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-white rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total de la commande:</span>
                      <span className="text-xl font-bold text-emh-red">{order.total.toFixed(2)} DT</span>
                    </div>
                    {order.estimatedDelivery && (
                      <p className="text-sm text-gray-600 mt-2">
                        Livraison estimée: {formatDate(order.estimatedDelivery)}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-lg text-gray-600">
                  Merci pour votre commande, {order.customerInfo.name}! Notre équipe va vous contacter sous peu pour
                  confirmer les détails et organiser la livraison.
                </p>
              </div>
            ) : (
              <p className="text-lg text-gray-600 mb-8">
                Merci pour votre commande! Notre équipe va vous contacter sous peu pour confirmer les détails et
                organiser la livraison.
              </p>
            )}

            <div className="space-y-4 mt-8">
              <p className="text-sm text-gray-500">
                Vous recevrez un email de confirmation avec tous les détails de votre commande.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-emh-red hover:bg-red-700 text-white">
                  <Link href="/products">
                    Continuer mes achats
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
