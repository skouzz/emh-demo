"use client"

import { useState } from "react"
import { Calendar, Package, User, Phone, MapPin, Eye } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Order } from "@/lib/db/models/order"
import OrderStatusBadge from "./OrderStatusBadge"
import PaymentStatusBadge from "./PaymentStatusBadge"

interface OrderCardProps {
  order: Order
  onViewDetails?: (order: Order) => void
  onUpdateStatus?: (orderId: string, status: Order["status"]) => void
  showActions?: boolean
}

export default function OrderCard({ order, onViewDetails, onUpdateStatus, showActions = false }: OrderCardProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [isArchiving, setIsArchiving] = useState(false)

  const handleStatusUpdate = async (newStatus: Order["status"]) => {
    if (!onUpdateStatus) return

    setIsUpdating(true)
    await onUpdateStatus(order.id, newStatus)
    setIsUpdating(false)
  }

  const toggleArchive = async (archived: boolean) => {
    setIsArchiving(true)
    await fetch(`/api/orders/${order.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ archived })
    })
    // Let parent refresh via page-level reload or hook refresh
    setIsArchiving(false)
    if (typeof window !== "undefined") window.location.reload()
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
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">{order.orderNumber}</CardTitle>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              {formatDate(order.createdAt)}
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <OrderStatusBadge status={order.status} />
            <PaymentStatusBadge status={order.paymentStatus} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Customer Info */}
        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          <User className="h-5 w-5 text-gray-600 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{order.customerInfo.name}</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                {order.customerInfo.phone}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                {order.customerInfo.address}, {order.customerInfo.city}
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
            <Package className="h-4 w-4" />
            Articles ({order.items.length})
          </h4>
          <div className="space-y-2">
            {order.items.slice(0, 2).map((item) => (
              <div key={item.id} className="flex gap-3 p-2 border rounded-lg">
                <div className="relative w-12 h-12 bg-gray-100 rounded flex-shrink-0">
                  {item.productImage ? (
                    <Image
                      src={item.productImage || "/placeholder.svg"}
                      alt={item.productName}
                      fill
                      className="object-contain p-1 rounded"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <Package className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 line-clamp-1">{item.productName}</p>
                  <p className="text-xs text-gray-600">Réf: {item.productReference}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-600">Qté: {item.quantity}</span>
                    <span className="text-sm font-medium text-emh-red">{item.subtotal.toFixed(2)} DT</span>
                  </div>
                </div>
              </div>
            ))}
            {order.items.length > 2 && (
              <p className="text-sm text-gray-600 text-center py-2">
                +{order.items.length - 2} autre{order.items.length - 2 > 1 ? "s" : ""} article
                {order.items.length - 2 > 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>

        {/* Order Total */}
        <div className="border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-900">Total:</span>
            <span className="text-lg font-bold text-emh-red">{order.total.toFixed(2)} DT</span>
          </div>
          {order.estimatedDelivery && (
            <p className="text-sm text-gray-600 mt-1">Livraison estimée: {formatDate(order.estimatedDelivery)}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {onViewDetails && (
            <Button variant="outline" size="sm" onClick={() => onViewDetails(order)} className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              Détails
            </Button>
          )}

          {showActions && (
            <div className="flex gap-2 flex-1">
              {onUpdateStatus && (
                <>
              {order.status === "pending" && (
                <Button
                  size="sm"
                  onClick={() => handleStatusUpdate("confirmed")}
                  disabled={isUpdating}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Confirmer
                </Button>
              )}
              {order.status === "confirmed" && (
                <Button
                  size="sm"
                  onClick={() => handleStatusUpdate("processing")}
                  disabled={isUpdating}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Préparer
                </Button>
              )}
              {order.status === "processing" && (
                <Button
                  size="sm"
                  onClick={() => handleStatusUpdate("shipped")}
                  disabled={isUpdating}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Expédier
                </Button>
              )}
              {order.status === "shipped" && (
                <Button
                  size="sm"
                  onClick={() => handleStatusUpdate("delivered")}
                  disabled={isUpdating}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Livrer
                    </Button>
                  )}
                </>
              )}

              {order.status === "delivered" && !order.archived && (
                <Button size="sm" variant="outline" onClick={() => toggleArchive(true)} disabled={isArchiving}>
                  Archiver
                </Button>
              )}
              {order.archived && (
                <Button size="sm" variant="outline" onClick={() => toggleArchive(false)} disabled={isArchiving}>
                  Désarchiver
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
