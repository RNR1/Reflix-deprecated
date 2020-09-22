import { helpers } from "oak"
import type { RouterContext } from "oak"
import { ObjectId, FilterType, WithID } from "mongo"

import { getDb } from "../config/db_client.ts"
import type { Profile } from "../models/Profile.ts"
import {
  extractContextBody,
  validateAction,
  validateInputs,
  checkRentalExistence,
  getRentalCommand,
} from "../utils/helpers.ts"

export async function getProfiles(ctx: RouterContext) {
  try {
    const profiles = await getDb().collection<Profile[]>("profiles").find()
    ctx.response.body = profiles
  } catch (error) {
    ctx.response.status = 500
    ctx.response.body = error.message
  }
}

export async function getProfile(ctx: RouterContext) {
  try {
    const { id } = ctx.params
    if (!id) throw new Error("Profile id is missing")
    const _id = ObjectId(id)

    const profile = await getDb().collection("profiles").findOne({ _id })
    if (!profile) throw new Error("Profile Not Found")
    ctx.response.body = profile
  } catch (error) {
    ctx.response.status = 404
    ctx.response.body = error.message
  }
}

export async function addProfile(ctx: RouterContext) {
  try {
    const { name, img }: Profile = await extractContextBody(ctx)
    if (!name || !img) throw new Error("Incorrect profile data")
    const profile: Profile = { name, img, rentals: [] }
    const _id = await getDb().collection("profiles").insertOne(profile)
    profile._id = _id

    ctx.response.body = { message: "Profile created", profile }
  } catch (error) {
    ctx.response.status = 400
    ctx.response.body = { message: error.message }
  }
}

export async function rentMovie(ctx: RouterContext) {
  try {
    const { action, profile, movie } = helpers.getQuery(ctx, {
      mergeParams: true,
    })
    const movieId = parseInt(movie)
    validateAction(action)
    validateInputs(profile, movieId)
    const exists: WithID | null = await checkRentalExistence(profile, movieId)
    const command = getRentalCommand(action, exists, movieId) as FilterType<
      unknown
    >

    await getDb()
      .collection("profiles")
      .updateOne({ _id: ObjectId(profile) }, command)
    ctx.response.body = { message: `movie has been ${action}ed successfully` }
  } catch (error) {
    ctx.response.status = 400
    ctx.response.body = { message: error.message }
  }
}
