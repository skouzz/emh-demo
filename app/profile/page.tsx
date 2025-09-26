"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCustomerAuth } from "@/hooks/use-customer-auth"
import { userStore } from "@/lib/user-store"
import Link from "next/link"
import { useOrders } from "@/hooks/use-orders"
import OrderStatusBadge from "@/components/orders/OrderStatusBadge"
import PaymentStatusBadge from "@/components/orders/PaymentStatusBadge"
import { useMemo } from "react"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useCustomerAuth()
  const { getOrdersByCustomer, orders } = useOrders()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [audience, setAudience] = useState<"pro" | "particulier">("particulier")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user)) {
      router.push("/login")
      return
    }
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setAudience((user as any).audience || "particulier")
    }
  }, [isAuthenticated, isLoading, user, router])

  const handleSave = () => {
    if (!user) return
    userStore.update(user.id, { name, email, audience })
    setMessage("Profil mis à jour ✔")
    setTimeout(() => setMessage(""), 2000)
  }

  const myRecentOrders = useMemo(() => {
    if (!user) return []
    return getOrdersByCustomer(user.email)
      .slice()
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 3)
  }, [orders, user])

  if (isLoading || !isAuthenticated || !user) return null

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mon profil</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input placeholder="Nom complet" value={name} onChange={(e) => setName(e.target.value)} />
              <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Select value={audience} onValueChange={(v) => setAudience(v as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Type de compte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="particulier">Particulier</SelectItem>
                  <SelectItem value="pro">Professionnel</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleSave} className="w-full bg-emh-red hover:bg-red-700 text-white">Enregistrer</Button>
              {message && <div className="text-sm text-green-600">{message}</div>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Mes dernières commandes</CardTitle>
              <Button asChild variant="outline" size="sm">
                <Link href="/orders">Voir tout</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {myRecentOrders.length === 0 ? (
              <div className="text-sm text-gray-600">Vous n'avez pas encore de commandes.</div>
            ) : (
              <div className="space-y-3">
                {myRecentOrders.map((o) => (
                  <div key={o.id} className="p-3 border rounded-lg bg-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Commande {o.orderNumber}</div>
                        <div className="text-xs text-gray-600">{o.items.length} article{o.items.length > 1 ? "s" : ""} • {o.total.toFixed(2)} DT</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <OrderStatusBadge status={o.status} />
                        <PaymentStatusBadge status={o.paymentStatus} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 