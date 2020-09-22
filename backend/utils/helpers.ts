import type { RouterContext } from "oak"
import type { WithID } from "mongo"
import { ObjectId } from "mongo"
import { getDb } from "../config/db_client.ts"

export async function extractContextBody(ctx: RouterContext) {
  if (!ctx.request.hasBody) throw new Error("Profile data is missing")
  const body = await ctx.request.body()
  return await body.value
}
export function getRentalCommand(
  action: string,
  exists: WithID | null,
  movie: number
) {
  let command
  if (action === "rent") {
    if (exists) throw new Error("Movie already rented")
    command = {
      $addToSet: { rentals: movie },
    }
  }

  if (action === "return") {
    if (!exists) throw new Error("movie isn't rented")
    command = {
      $pull: { rentals: movie },
    }
  }
  return command
}
export function checkRentalExistence(profile: string, movie: number) {
  return getDb()
    .collection("profiles")
    .findOne({
      _id: ObjectId(profile),
      rentals: { $in: [movie] },
    })
}
export function validateInputs(profile: string, movie: number) {
  if (!profile || !movie) throw new Error("Profile and/or Movie are missing")
}
export function validateAction(action: string) {
  if (action !== "rent" && action !== "return") {
    throw new Error("Invalid operation")
  }
}
