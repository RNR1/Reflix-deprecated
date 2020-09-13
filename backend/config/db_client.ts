import { MongoClient } from "mongo"
import type { Database } from "mongo"
import "https://deno.land/x/dotenv/load.ts"

let db: Database

export function connect() {
  const client = new MongoClient()
  const URI = Deno.env.get("MONGODB_URI")
  if (URI) client.connectWithUri(URI)
  else console.error("ERROR")

  db = client.database("reflix")
}

export function getDb() {
  return db
}
