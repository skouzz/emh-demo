import { NextRequest, NextResponse } from "next/server"
import { orderRepository } from "@/lib/db/repositories/order-repository"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const customerEmail = searchParams.get("customerEmail")
    const from = searchParams.get("from")
    const to = searchParams.get("to")
    const includeArchived = searchParams.get("includeArchived") === "true"

    let orders

    if (from && to) {
      orders = await orderRepository.findByDateRange(new Date(from), new Date(to), includeArchived)
    } else if (status) {
      orders = await orderRepository.findByStatus(status as any, includeArchived)
    } else if (customerEmail) {
      orders = await orderRepository.findByCustomerEmail(customerEmail)
    } else {
      orders = await orderRepository.findAll(includeArchived)
    }

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()
    
    // Generate unique ID and order number
    orderData.id = Date.now().toString()
    orderData.orderNumber = await orderRepository.generateOrderNumber()
    
    const order = await orderRepository.create(orderData)
    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}