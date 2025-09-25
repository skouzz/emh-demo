"use client"

import { useState, useEffect } from "react"
import type { Order, OrderItem, CustomerInfo } from "@/types/order"
import type { Product } from "@/types/product"

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: "order-1",
    orderNumber: "EMH-2024-001",
    customerInfo: {
      name: "Ahmed Ben Ali",
      email: "ahmed@example.com",
      phone: "+216 20 123 456",
      address: "123 Avenue Habib Bourguiba",
      city: "Tunis",
      postalCode: "1000",
      notes: "Livraison préférée l'après-midi",
    },
    items: [
      {
        id: "item-1",
        productId: "prod-1",
        productName: "Interrupteur va-et-vient Céliane",
        productReference: "067001",
        quantity: 5,
        price: 25.5,
        subtotal: 127.5,
      },
      {
        id: "item-2",
        productId: "prod-2",
        productName: "Prise 2P+T Céliane",
        productReference: "067111",
        quantity: 10,
        price: 18.75,
        subtotal: 187.5,
      },
    ],
    subtotal: 315.0,
    tax: 56.7,
    total: 371.7,
    status: "confirmed",
    paymentStatus: "pending",
    paymentMethod: "cash_on_delivery",
    shippingMethod: "standard",
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "order-2",
    orderNumber: "EMH-2024-002",
    customerInfo: {
      name: "Fatma Trabelsi",
      email: "fatma@example.com",
      phone: "+216 25 987 654",
      address: "456 Rue de la République",
      city: "Sfax",
      postalCode: "3000",
    },
    items: [
      {
        id: "item-3",
        productId: "prod-3",
        productName: "Tableau électrique 2 rangées",
        productReference: "401212",
        quantity: 1,
        price: 145.0,
        subtotal: 145.0,
      },
    ],
    subtotal: 145.0,
    tax: 26.1,
    total: 171.1,
    status: "processing",
    paymentStatus: "pending",
    paymentMethod: "cash_on_delivery",
    shippingMethod: "express",
    estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
]

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const loadOrders = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const savedOrders = localStorage.getItem("emh-orders")
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders).map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
          estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery) : undefined,
          actualDelivery: order.actualDelivery ? new Date(order.actualDelivery) : undefined,
        }))
        setOrders(parsedOrders)
      } else {
        setOrders(mockOrders)
        localStorage.setItem("emh-orders", JSON.stringify(mockOrders))
      }

      setIsLoading(false)
    }

    loadOrders()
  }, [])

  const createOrder = async (
    customerInfo: CustomerInfo,
    items: { product: Product; quantity: number }[],
  ): Promise<Order> => {
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

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber: `EMH-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, "0")}`,
      customerInfo,
      items: orderItems,
      subtotal,
      tax,
      total,
      status: "pending",
      paymentStatus: "pending",
      paymentMethod: "cash_on_delivery",
      shippingMethod: "standard",
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const updatedOrders = [newOrder, ...orders]
    setOrders(updatedOrders)
    localStorage.setItem("emh-orders", JSON.stringify(updatedOrders))

    return newOrder
  }

  const updateOrderStatus = async (orderId: string, status: Order["status"], notes?: string): Promise<void> => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return {
          ...order,
          status,
          notes: notes || order.notes,
          updatedAt: new Date(),
        }
      }
      return order
    })

    setOrders(updatedOrders)
    localStorage.setItem("emh-orders", JSON.stringify(updatedOrders))
  }

  const updatePaymentStatus = async (orderId: string, paymentStatus: Order["paymentStatus"]): Promise<void> => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return {
          ...order,
          paymentStatus,
          updatedAt: new Date(),
        }
      }
      return order
    })

    setOrders(updatedOrders)
    localStorage.setItem("emh-orders", JSON.stringify(updatedOrders))
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
    const totalOrders = orders.length
    const pendingOrders = orders.filter((order) => order.status === "pending").length
    const confirmedOrders = orders.filter((order) => order.status === "confirmed").length
    const processingOrders = orders.filter((order) => order.status === "processing").length
    const shippedOrders = orders.filter((order) => order.status === "shipped").length
    const deliveredOrders = orders.filter((order) => order.status === "delivered").length
    const cancelledOrders = orders.filter((order) => order.status === "cancelled").length

    const totalRevenue = orders
      .filter((order) => order.status !== "cancelled")
      .reduce((sum, order) => sum + order.total, 0)

    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    return {
      totalOrders,
      pendingOrders,
      confirmedOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
      averageOrderValue,
    }
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
  }
}
