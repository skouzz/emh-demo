"use client"

import { ChartBar as BarChart3, Package, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product, ProductCategory } from "@/lib/db/models/product"

interface AdminStatsProps {
  products: Product[]
  categories: ProductCategory[]
}

export default function AdminStats({ products, categories }: AdminStatsProps) {
  const totalProducts = products.length
  const featuredProducts = products.filter((p) => p.featured).length
  const inStockProducts = products.filter((p) => p.availability === "in-stock").length
  const outOfStockProducts = products.filter((p) => p.availability === "out-of-stock").length

  const categoryStats = categories.map((category) => ({
    name: category.name,
    count: products.filter((p) => p.category === category.id).length,
  }))

  const stats = [
    {
      title: "Total Produits",
      value: totalProducts,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Produits Vedettes",
      value: featuredProducts,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "En Stock",
      value: inStockProducts,
      icon: Users,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Rupture de Stock",
      value: outOfStockProducts,
      icon: BarChart3,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Répartition par Catégorie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryStats.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-medium">{category.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-emh-red h-2 rounded-full"
                      style={{
                        width: totalProducts > 0 ? `${(category.count / totalProducts) * 100}%` : "0%",
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold w-8 text-right">{category.count}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Activité Récente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Aucune activité récente</p>
            <p className="text-sm">Les modifications de produits apparaîtront ici</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
