import { NextRequest, NextResponse } from "next/server"
import { userRepository } from "@/lib/db/repositories/user-repository"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Initialize default users if needed
    await userRepository.initializeDefaultUsers()

    const user = await userRepository.findByEmail(email)
    
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Remove password from response
    const { password: _, ...safeUser } = user
    
    return NextResponse.json({ user: safeUser, success: true })
  } catch (error) {
    console.error("Error during login:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}