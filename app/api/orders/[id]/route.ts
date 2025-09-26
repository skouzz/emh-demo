import { NextRequest, NextResponse } from "next/server"
import { orderRepository } from "@/lib/db/repositories/order-repository"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await orderRepository.findById(params.id)
    
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status, paymentStatus, notes, archived } = await request.json()
    
    let order
    if (typeof archived === "boolean") {
      order = await orderRepository.setArchived(params.id, archived)
    } else if (status) {
      order = await orderRepository.updateStatus(params.id, status, notes)
    } else if (paymentStatus) {
      order = await orderRepository.updatePaymentStatus(params.id, paymentStatus)
    }
    
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}