import { Badge } from "@/components/ui/badge"
import type { Order } from "@/lib/db/models/order"

interface OrderStatusBadgeProps {
  status: Order["status"]
  className?: string
}

export default function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const getStatusConfig = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return {
          label: "En attente",
          className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        }
      case "confirmed":
        return {
          label: "Confirmée",
          className: "bg-blue-100 text-blue-800 border-blue-200",
        }
      case "processing":
        return {
          label: "En préparation",
          className: "bg-purple-100 text-purple-800 border-purple-200",
        }
      case "shipped":
        return {
          label: "Expédiée",
          className: "bg-indigo-100 text-indigo-800 border-indigo-200",
        }
      case "delivered":
        return {
          label: "Livrée",
          className: "bg-green-100 text-green-800 border-green-200",
        }
      case "cancelled":
        return {
          label: "Annulée",
          className: "bg-red-100 text-red-800 border-red-200",
        }
      default:
        return {
          label: status,
          className: "bg-gray-100 text-gray-800 border-gray-200",
        }
    }
  }

  const config = getStatusConfig(status)

  return <Badge className={`${config.className} ${className}`}>{config.label}</Badge>
}
