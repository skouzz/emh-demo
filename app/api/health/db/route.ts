import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function GET() {
  try {
    const db = await getDb()
    // Run a lightweight command to verify connection
    const result = await db.command({ ping: 1 })
    return NextResponse.json({ ok: true, ping: result.ok === 1, db: db.databaseName })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 })
  }
} 