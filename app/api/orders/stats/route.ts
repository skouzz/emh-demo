import { NextResponse } from "next/server"
import { orderRepository } from "@/lib/db/repositories/order-repository"

export async function GET() {
  try {
    const stats = await orderRepository.getStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching order stats:", error)
    return NextResponse.json({ error: "Failed to fetch order stats" }, { status: 500 })
  }
}