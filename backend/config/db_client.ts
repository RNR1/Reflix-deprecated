import { MongoClient, Database } from 'https://deno.land/x/mongo@v0.9.1/mod.ts'
import 'https://deno.land/x/dotenv/load.ts'

let db: Database

export function connect() {
	const client = new MongoClient()
	const URI = Deno.env.get('MONGODB_URI')
	if (URI) client.connectWithUri(URI)
	else console.log('ERROR')

	db = client.database('reflix')
}

export function getDb() {
	return db
}
