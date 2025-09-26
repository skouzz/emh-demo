import { Badge } from "@/components/ui/badge"
import type { Order } from "@/lib/db/models/order"

interface PaymentStatusBadgeProps {
  status: Order["paymentStatus"]
  className?: string
}

export default function PaymentStatusBadge({ status, className }: PaymentStatusBadgeProps) {
  const getStatusConfig = (status: Order["paymentStatus"]) => {
    switch (status) {
      case "pending":
        return {
          label: "En attente",
          className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        }
      case "paid":
        return {
          label: "Payé",
          className: "bg-green-100 text-green-800 border-green-200",
        }
      case "failed":
        return {
          label: "Échec",
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
