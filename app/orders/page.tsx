"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCustomerAuth } from "@/hooks/use-customer-auth"
import { useOrders } from "@/hooks/use-orders"
import OrderStatusBadge from "@/components/orders/OrderStatusBadge"
import PaymentStatusBadge from "@/components/orders/PaymentStatusBadge"

export default function MyOrdersPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useCustomerAuth()
  const { orders, isLoading: ordersLoading, getOrdersByCustomer } = useOrders()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated || !user) return null

  const myOrders = getOrdersByCustomer(user.email)

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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mes commandes</h1>
          <p className="text-gray-600">Consultez et suivez vos commandes passées.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Historique ({myOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <div className="text-sm text-gray-600">Chargement des commandes...</div>
            ) : myOrders.length === 0 ? (
              <div className="text-sm text-gray-600">
                Aucune commande trouvée. <Link href="/products" className="text-emh-red underline">Commencer vos achats</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {myOrders
                  .slice()
                  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                  .map((o) => (
                    <div key={o.id} className="p-4 border rounded-lg bg-white">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                          <div className="font-medium text-gray-900">Commande {o.orderNumber}</div>
                          <div className="text-sm text-gray-600">Passée le {formatDate(o.createdAt)}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <OrderStatusBadge status={o.status} />
                          <PaymentStatusBadge status={o.paymentStatus} />
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm text-gray-700">
                        <div>
                          {o.items.length} article{o.items.length > 1 ? "s" : ""} • Total {o.total.toFixed(2)} DT
                        </div>
                        <div className="flex gap-2">
                          <Button asChild variant="outline" size="sm">
                            <Link href="/track-order">Suivre</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
} 