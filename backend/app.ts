import { Application, send } from "oak"
import * as path from "path"
import { parse } from "flags"
import { config as env } from "dotenv"

import { movies, profiles } from "./routes/index.ts"
import { connect } from "./config/db_client.ts"

env()
connect()

const port = Number(Deno.env.get("PORT")!)
const { args } = Deno
const argPort = parse(args).port

const app = new Application()

app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*")
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE"
  )
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type")
  await next()
})

app.use(movies.routes())
app.use(movies.allowedMethods())
app.use(profiles.routes())
app.use(profiles.allowedMethods())

await app.listen({ port: argPort ? Number(argPort) : port })
