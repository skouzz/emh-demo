"use client"

import { useMemo, useState } from "react"
import { Search, User, Mail, Phone, MapPin, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useOrders } from "@/hooks/use-orders"

export default function AdminCustomersPage() {
  const { orders } = useOrders()
  const [query, setQuery] = useState("")

  const customers = useMemo(() => {
    const map = new Map<string, {
      name: string
      email: string
      phone: string
      city: string
      address: string
      ordersCount: number
      totalSpent: number
    }>()

    for (const order of orders) {
      const key = `${order.customerInfo.email.toLowerCase()}`
      const existing = map.get(key)
      if (existing) {
        existing.ordersCount += 1
        existing.totalSpent += order.total
      } else {
        map.set(key, {
          name: order.customerInfo.name,
          email: order.customerInfo.email,
          phone: order.customerInfo.phone,
          city: order.customerInfo.city,
          address: order.customerInfo.address,
          ordersCount: 1,
          totalSpent: order.total,
        })
      }
    }

    let list = Array.from(map.values())
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q),
      )
    }
    return list.sort((a, b) => b.ordersCount - a.ordersCount)
  }, [orders, query])

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
        <p className="text-gray-600">{customers.length} client{customers.length !== 1 ? "s" : ""} au total</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher par nom, email, téléphone ou ville..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {customers.map((c) => (
          <Card key={c.email}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-emh-red" /> {c.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-gray-500" /> {c.email}</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-gray-500" /> {c.phone}</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gray-500" /> {c.city}</div>
              <div className="text-gray-600">{c.address}</div>
              <div className="pt-2 flex items-center justify-between">
                <span className="flex items-center gap-2 text-gray-600">
                  <Package className="h-4 w-4" /> {c.ordersCount} commande{c.ordersCount > 1 ? "s" : ""}
                </span>
                <span className="font-semibold">{c.totalSpent.toFixed(2)} DT</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 