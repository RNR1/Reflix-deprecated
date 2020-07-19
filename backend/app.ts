import { config } from 'https://deno.land/x/dotenv/mod.ts'
import { Application } from 'https://deno.land/x/oak@main/mod.ts'

import { movies, profiles } from './routes/index.ts'
import { connect } from './config/db_client.ts'

config()
connect()

const app = new Application()

app.use(async (ctx, next) => {
	ctx.response.headers.set('Access-Control-Allow-Origin', '*')
	ctx.response.headers.set(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE'
	)
	ctx.response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
	await next()
})

app.use(movies.routes())
app.use(movies.allowedMethods())
app.use(profiles.routes())
app.use(profiles.allowedMethods())

await app.listen({ port: 8000 })
