import { NextRequest, NextResponse } from "next/server"
import { userRepository } from "@/lib/db/repositories/user-repository"

export async function GET() {
  try {
    const users = await userRepository.findAll()
    // Remove passwords from response
    const safeUsers = users.map(({ password, ...user }) => user)
    return NextResponse.json(safeUsers)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()
    
    // Generate unique ID
    userData.id = Date.now().toString()
    
    const user = await userRepository.create(userData)
    // Remove password from response
    const { password, ...safeUser } = user
    
    return NextResponse.json(safeUser, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: error.message || "Failed to create user" }, { status: 500 })
  }
}