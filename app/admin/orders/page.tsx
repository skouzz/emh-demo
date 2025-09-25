"use client"

import { useState, useMemo } from "react"
import { Search, Filter, Download, RefreshCw, Package, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useOrders } from "@/hooks/use-orders"
import { useAuth } from "@/hooks/use-auth"
import OrderCard from "@/components/orders/OrderCard"
import type { Order } from "@/types/order"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminOrdersPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { orders, isLoading, updateOrderStatus } = useOrders()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")
  const router = useRouter()

  // Redirect if not admin (client-side to avoid hydration mismatch)
  useEffect(() => {
    if (!authLoading && (!user || (user.role !== "admin" && user.role !== "superadmin"))) {
      router.push("/admin/login")
    }
  }, [authLoading, user, router])

  const filteredAndSortedOrders = useMemo(() => {
    const filtered = orders.filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerInfo.email.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || order.status === statusFilter

      return matchesSearch && matchesStatus
    })

    // Sort orders
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        break
      case "oldest":
        filtered.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        break
      case "highest":
        filtered.sort((a, b) => b.total - a.total)
        break
      case "lowest":
        filtered.sort((a, b) => a.total - b.total)
        break
      default:
        break
    }

    return filtered
  }, [orders, searchQuery, statusFilter, sortBy])

  const handleOrderUpdate = async (orderId: string, status: Order["status"]) => {
    await updateOrderStatus(orderId, status)
  }

  const exportOrders = () => {
    const csvContent = [
      ["Numéro", "Client", "Email", "Téléphone", "Statut", "Total", "Date"].join(","),
      ...filteredAndSortedOrders.map((order) =>
        [
          order.orderNumber,
          order.customerInfo.name,
          order.customerInfo.email,
          order.customerInfo.phone,
          order.status,
          order.total.toFixed(2),
          order.createdAt.toLocaleDateString("fr-FR"),
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `commandes-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-emh-red" />
          <p className="text-gray-600">Chargement des commandes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <Button asChild variant="outline">
                <Link href="/admin/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Tableau de bord
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Commandes</h1>
                <p className="text-gray-600">Visualiser et gérer toutes les commandes</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={exportOrders} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
              <Button onClick={() => window.location.reload()} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualiser
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher par numéro, nom client ou email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="confirmed">Confirmées</SelectItem>
                    <SelectItem value="processing">En préparation</SelectItem>
                    <SelectItem value="shipped">Expédiées</SelectItem>
                    <SelectItem value="delivered">Livrées</SelectItem>
                    <SelectItem value="cancelled">Annulées</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Plus récentes</SelectItem>
                    <SelectItem value="oldest">Plus anciennes</SelectItem>
                    <SelectItem value="highest">Montant décroissant</SelectItem>
                    <SelectItem value="lowest">Montant croissant</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setStatusFilter("all")
                    setSortBy("newest")
                  }}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Réinitialiser
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Commandes ({filteredAndSortedOrders.length})</h2>
          </div>

          {filteredAndSortedOrders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commande trouvée</h3>
                <p className="text-gray-600">
                  {orders.length === 0
                    ? "Aucune commande n'a été passée pour le moment."
                    : "Aucune commande ne correspond à vos critères de recherche."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedOrders.map((order) => (
                <OrderCard key={order.id} order={order} onUpdateStatus={handleOrderUpdate} showActions={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
