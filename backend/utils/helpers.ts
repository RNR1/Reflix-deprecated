import type { RouterContext } from "oak"
import type { WithID } from "mongo"
import { ObjectId } from "mongo"
import { getDb } from "../config/db_client.ts"

export async function extractContextBody(ctx: RouterContext) {
  if (!ctx.request.hasBody) throw new Error("Profile data is missing")
  const body = await ctx.request.body()
  return await body.value
}
export function getListCommand(
  action: string,
  exists: WithID | null,
  movie: number
) {
  let command
  if (action === "add") {
    if (exists) throw new Error("Movie already rented")
    command = {
      $addToSet: { list: movie },
    }
  }

  if (action === "remove") {
    if (!exists) throw new Error("movie isn't rented")
    command = {
      $pull: { list: movie },
    }
  }
  return command
}
export function checkRentalExistence(profile: string, movie: number) {
  return getDb()
    .collection("profiles")
    .findOne({
      _id: ObjectId(profile),
      list: { $in: [movie] },
    })
}
export function validateInputs(profile: string, movie: number) {
  if (!profile || !movie) throw new Error("Profile and/or Movie are missing")
}
export function validateAction(action: string) {
  if (action !== "add" && action !== "remove") {
    throw new Error("Invalid operation")
  }
}
