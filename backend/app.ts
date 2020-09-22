import { Application } from "oak"
import { parse } from "flags"
import { config as env } from "dotenv"
import { oakCors } from "cors"

import { profiles } from "./routes/index.ts"
import { connect } from "./config/db_client.ts"

env()
connect()

const port = Number(Deno.env.get("PORT")!)
const { args } = Deno
const argPort = parse(args).port

const app = new Application()

app.use(oakCors())

app.use(profiles.routes())
app.use(profiles.allowedMethods())

await app.listen({ port: argPort ? Number(argPort) : port })
