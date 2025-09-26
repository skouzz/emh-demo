import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/db/connection"

export async function GET() {
  try {
    const db = await getDatabase()
    // Run a lightweight command to verify connection
    await db.command({ ping: 1 })
    return NextResponse.json({ 
      ok: true, 
      status: "connected", 
      database: db.databaseName 
    })
  } catch (err: any) {
    return NextResponse.json({ 
      ok: false, 
      status: "error",
      error: err?.message || String(err) 
    }, { status: 500 })
  }
} 