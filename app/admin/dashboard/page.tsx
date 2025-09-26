"use client"

import { useState, useMemo } from "react"
import { Package, ShoppingCart, TrendingUp, Calendar, Filter, Search, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useOrders } from "@/hooks/use-orders"
import { useAuth } from "@/hooks/use-auth"
import OrderCard from "@/components/orders/OrderCard"
import type { Order } from "@/lib/db/models/order"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminDashboardPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { orders, isLoading, updateOrderStatus, getOrderStats } = useOrders()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const router = useRouter()

  // Redirect if not admin (client-side to avoid hydration mismatch)
  useEffect(() => {
    if (!authLoading && (!user || (user.role !== "admin" && user.role !== "superadmin"))) {
      router.push("/admin/login")
    }
  }, [authLoading, user, router])

  const stats = getOrderStats()

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerInfo.email.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || order.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [orders, searchQuery, statusFilter])

  const handleOrderUpdate = async (orderId: string, status: Order["status"]) => {
    await updateOrderStatus(orderId, status)
  }

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
  }

  const exportOrders = () => {
    const csvContent = [
      ["Numéro", "Client", "Email", "Téléphone", "Statut", "Total", "Date"].join(","),
      ...filteredOrders.map((order) =>
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
          <p className="text-gray-600">Chargement du tableau de bord...</p>
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord administrateur</h1>
              <p className="text-gray-600">Gestion des commandes et statistiques</p>
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
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Commandes</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">Toutes les commandes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Attente</CardTitle>
              <Calendar className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</div>
              <p className="text-xs text-muted-foreground">À traiter</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chiffre d'Affaires</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.totalRevenue.toFixed(2)} DT</div>
              <p className="text-xs text-muted-foreground">Total des ventes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Panier Moyen</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.averageOrderValue.toFixed(2)} DT</div>
              <p className="text-xs text-muted-foreground">Par commande</p>
            </CardContent>
          </Card>
        </div>

        {/* Status Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Répartition des Commandes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</div>
                <div className="text-sm text-yellow-700">En attente</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{stats.confirmedOrders}</div>
                <div className="text-sm text-blue-700">Confirmées</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{stats.processingOrders}</div>
                <div className="text-sm text-purple-700">En préparation</div>
              </div>
              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{stats.shippedOrders}</div>
                <div className="text-sm text-indigo-700">Expédiées</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stats.deliveredOrders}</div>
                <div className="text-sm text-green-700">Livrées</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{stats.cancelledOrders}</div>
                <div className="text-sm text-red-700">Annulées</div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setStatusFilter("all")
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
            <h2 className="text-xl font-semibold text-gray-900">Commandes ({filteredOrders.length})</h2>
          </div>

          {filteredOrders.length === 0 ? (
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
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onViewDetails={handleViewDetails}
                  onUpdateStatus={handleOrderUpdate}
                  showActions={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Détails de la commande {selectedOrder.orderNumber}</h2>
                <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                  Fermer
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-medium mb-4">Informations client</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">Nom:</span> {selectedOrder.customerInfo.name}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {selectedOrder.customerInfo.email}
                    </div>
                    <div>
                      <span className="font-medium">Téléphone:</span> {selectedOrder.customerInfo.phone}
                    </div>
                    <div>
                      <span className="font-medium">Ville:</span> {selectedOrder.customerInfo.city}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Adresse:</span> {selectedOrder.customerInfo.address}
                  </div>
                  {selectedOrder.customerInfo.notes && (
                    <div>
                      <span className="font-medium">Notes:</span> {selectedOrder.customerInfo.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-medium mb-4">Articles commandés</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{item.productName}</h4>
                        <p className="text-sm text-gray-600">Réf: {item.productReference}</p>
                        <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{item.subtotal.toFixed(2)} DT</div>
                        <div className="text-sm text-gray-600">{item.price.toFixed(2)} DT / unité</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Sous-total:</span>
                    <span>{selectedOrder.subtotal.toFixed(2)} DT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TVA:</span>
                    <span>{selectedOrder.tax.toFixed(2)} DT</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>{selectedOrder.total.toFixed(2)} DT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
