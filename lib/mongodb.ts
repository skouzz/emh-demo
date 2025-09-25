import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI || ""

if (!uri) {
  // Intentionally not throwing to allow localStorage fallback until configured
}

let client: MongoClient | undefined
let clientPromise: Promise<MongoClient>

const globalAny = global as unknown as { _mongoClientPromise?: Promise<MongoClient> }

if (!globalAny._mongoClientPromise) {
  client = new MongoClient(uri)
  globalAny._mongoClientPromise = client.connect()
}

clientPromise = globalAny._mongoClientPromise as Promise<MongoClient>

function deriveDbNameFromUri(fallback = "emh"): string {
  try {
    const withoutQuery = uri.split("?")[0]
    const parts = withoutQuery.split("/")
    const maybeDb = parts[parts.length - 1]
    return maybeDb && maybeDb.length > 0 ? maybeDb : fallback
  } catch {
    return fallback
  }
}

export async function getDb(dbName?: string) {
  const c = await clientPromise
  const name = dbName || deriveDbNameFromUri()
  return c.db(name)
} 