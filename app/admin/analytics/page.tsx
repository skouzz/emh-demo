"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useOrders } from "@/hooks/use-orders"
import { TrendingUp, ShoppingCart, Package, Calendar } from "lucide-react"

export default function AdminAnalyticsPage() {
  const { orders, getOrderStats } = useOrders()
  const stats = getOrderStats()

  const monthly = useMemo(() => {
    const byMonth = new Map<string, { total: number; count: number }>()
    for (const o of orders) {
      const key = `${o.createdAt.getFullYear()}-${String(o.createdAt.getMonth() + 1).padStart(2, "0")}`
      const e = byMonth.get(key) || { total: 0, count: 0 }
      e.total += o.total
      e.count += 1
      byMonth.set(key, e)
    }
    return Array.from(byMonth.entries()).sort((a, b) => a[0].localeCompare(b[0]))
  }, [orders])

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Statistiques</h1>
        <p className="text-gray-600">Aperçu des performances des commandes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Total Commandes</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-emh-red" /> {stats.totalOrders}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Chiffre d'Affaires</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-green-600" /> {stats.totalRevenue.toFixed(2)} DT
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Panier Moyen</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold flex items-center gap-2">
            <Package className="h-6 w-6 text-blue-600" /> {stats.averageOrderValue.toFixed(2)} DT
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">En Attente</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-yellow-600">{stats.pendingOrders}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-gray-600" /> Volume mensuel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {monthly.map(([month, data]) => (
              <div key={month} className="p-4 border rounded-lg text-center">
                <div className="text-xs text-gray-500">{month}</div>
                <div className="text-lg font-semibold">{data.count} cmd</div>
                <div className="text-sm text-gray-600">{data.total.toFixed(1)} DT</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 