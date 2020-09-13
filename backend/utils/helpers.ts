import { RouterContext } from "oak"
import { ObjectId, WithID } from "mongo"
import { getDb } from "../config/db_client.ts"
import { RENT_PRICE } from "./../config/consts.ts"

export async function extractContextBody(ctx: RouterContext) {
  if (!ctx.request.hasBody) throw new Error("Profile data is missing")
  const body = await ctx.request.body()
  return await body.value
}
export function getRentalCommand(
  action: string,
  exists: WithID | null,
  movie: string
) {
  let command
  if (action === "rent") {
    if (exists) throw new Error("Movie already rented")
    command = {
      $inc: { budget: -RENT_PRICE },
      $addToSet: { rentals: ObjectId(movie) },
    }
  }

  if (action === "return") {
    if (!exists) throw new Error("movie isn't rented")
    command = {
      $inc: { budget: RENT_PRICE },
      $pull: { rentals: ObjectId(movie) },
    }
  }
  return command
}
export function checkRentalExistence(profile: string, movie: string) {
  return getDb()
    .collection("profiles")
    .findOne({
      _id: ObjectId(profile),
      rentals: { $in: [ObjectId(movie)] },
    })
}
export function validateInputs(profile: string, movie: string) {
  if (!profile || !movie) throw new Error("Profile and/or Movie are missing")
}
export function validateAction(action: string) {
  if (action !== "rent" && action !== "return") {
    throw new Error("Invalid operation")
  }
}
