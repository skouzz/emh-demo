"use client"

import { useState, useEffect } from "react"
import type { Order, OrderItem, CustomerInfo } from "@/lib/db/models/order"
import type { Product } from "@/lib/db/models/product"

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
  })

  useEffect(() => {
    loadOrders()
    loadStats()
  }, [])

  const loadOrders = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/orders?includeArchived=true")
      
      if (response.ok) {
        const ordersData = await response.json()
        const parsedOrders = ordersData.map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
          estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery) : undefined,
          actualDelivery: order.actualDelivery ? new Date(order.actualDelivery) : undefined,
        }))
        setOrders(parsedOrders)
      }
    } catch (error) {
      console.error("Error loading orders:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const response = await fetch("/api/orders/stats")
      if (response.ok) {
        const stats = await response.json()
        setOrderStats(stats)
      }
    } catch (error) {
      console.error("Error loading order stats:", error)
    }
  }

  const createOrder = async (
    customerInfo: CustomerInfo,
    items: { product: Product; quantity: number }[]
  ): Promise<Order> => {
    try {
      const orderItems: OrderItem[] = items.map((item, index) => ({
        id: `item-${Date.now()}-${index}`,
        productId: item.product.id,
        productName: item.product.name,
        productReference: item.product.reference,
        productImage: item.product.images[0],
        quantity: item.quantity,
        price: item.product.price || 0,
        subtotal: (item.product.price || 0) * item.quantity,
      }))

      const subtotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0)
      const tax = subtotal * 0.18 // 18% TVA
      const total = subtotal + tax

      const orderData = {
        customerInfo,
        items: orderItems,
        subtotal,
        tax,
        total,
        status: "pending" as const,
        paymentStatus: "pending" as const,
        paymentMethod: "cash_on_delivery" as const,
        shippingMethod: "standard" as const,
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        const newOrder = await response.json()
        const parsedOrder = {
          ...newOrder,
          createdAt: new Date(newOrder.createdAt),
          updatedAt: new Date(newOrder.updatedAt),
          estimatedDelivery: newOrder.estimatedDelivery ? new Date(newOrder.estimatedDelivery) : undefined,
        }
        
        await loadOrders()
        await loadStats()
        return parsedOrder as Order
      } else {
        throw new Error("Failed to create order")
      }
    } catch (error) {
      console.error("Error creating order:", error)
      throw error
    }
  }

  const updateOrderStatus = async (orderId: string, status: Order["status"], notes?: string): Promise<void> => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      })
      
      if (response.ok) {
        await loadOrders()
        await loadStats()
      }
    } catch (error) {
      console.error("Error updating order status:", error)
    }
  }

  const updatePaymentStatus = async (orderId: string, paymentStatus: Order["paymentStatus"]): Promise<void> => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus }),
      })
      
      if (response.ok) {
        await loadOrders()
        await loadStats()
      }
    } catch (error) {
      console.error("Error updating payment status:", error)
    }
  }

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find((order) => order.id === orderId)
  }

  const getOrderByNumber = (orderNumber: string): Order | undefined => {
    return orders.find((order) => order.orderNumber === orderNumber)
  }

  const getOrdersByStatus = (status: Order["status"]): Order[] => {
    return orders.filter((order) => order.status === status)
  }

  const getOrdersByCustomer = (customerEmail: string): Order[] => {
    return orders.filter((order) => order.customerInfo.email === customerEmail)
  }

  const getOrderStats = () => {
    return orderStats
  }

  return {
    orders,
    isLoading,
    createOrder,
    updateOrderStatus,
    updatePaymentStatus,
    getOrderById,
    getOrderByNumber,
    getOrdersByStatus,
    getOrdersByCustomer,
    getOrderStats,
    refreshData: loadOrders,
  }
}
