import { MongoClient, Db } from "mongodb"

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const dbName = process.env.MONGODB_DB_NAME || "emh_platform"

let client: MongoClient | undefined
let clientPromise: Promise<MongoClient>

const globalAny = global as unknown as { _mongoClientPromise?: Promise<MongoClient> }

if (process.env.NODE_ENV === "development") {
  if (!globalAny._mongoClientPromise) {
    client = new MongoClient(uri)
    globalAny._mongoClientPromise = client.connect()
  }
  clientPromise = globalAny._mongoClientPromise
} else {
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise
  return client.db(dbName)
}

export async function closeConnection(): Promise<void> {
  if (client) {
    await client.close()
  }
}