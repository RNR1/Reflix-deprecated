import { RouterContext, helpers } from 'https://deno.land/x/oak@main/mod.ts'
import {
	ObjectId,
	FilterType,
	WithID
} from 'https://deno.land/x/mongo@v0.9.1/mod.ts'

import { getDb } from '../config/db_client.ts'
import Profile from '../models/Profile.ts'
import { DEFAULT_BUDGET, RENT_PRICE } from './../config/consts.ts'

export async function getProfiles(ctx: RouterContext) {
	try {
		const profiles = await getDb()
			.collection<Profile[]>('profiles')
			.aggregate([
				{
					$lookup: {
						from: 'movies',
						localField: 'rentals',
						foreignField: '_id',
						as: 'rentals'
					}
				}
			])
		ctx.response.body = { profiles }
	} catch (error) {
		console.log(error)
	}
}

export async function addProfile(ctx: RouterContext) {
	try {
		if (!ctx.request.hasBody) throw new Error('Profile data is missing')
		const body = await ctx.request.body()
		const { name, img }: Profile = await body.value
		if (!name || !img) throw new Error('Incorrect profile data')
		const profile: Profile = { name, img, budget: DEFAULT_BUDGET, rentals: [] }
		const _id = await getDb().collection('profiles').insertOne(profile)
		profile._id = _id

		ctx.response.body = { message: 'Profile created', profile }
	} catch (error) {
		ctx.response.body = { message: error.message }
	}
}

export async function rentMovie(ctx: RouterContext) {
	try {
		const { action, profile, movie } = helpers.getQuery(ctx, {
			mergeParams: true
		})

		validateAction(action)
		validateInputs(profile, movie)
		const exists: WithID | null = await checkRentalExistence(profile, movie)
		const command = getRentalCommand(action, exists, movie) as FilterType<
			unknown
		>

		await getDb()
			.collection('profiles')
			.updateOne({ _id: ObjectId(profile) }, command)
		ctx.response.body = { message: `movie has been ${action}ed successfully` }
	} catch (error) {
		ctx.response.status = 400
		ctx.response.body = { message: error.message }
	}
}
function getRentalCommand(
	action: string,
	exists: WithID | null,
	movie: string
) {
	let command
	if (action === 'rent') {
		if (exists) throw new Error('Movie already rented')
		command = {
			$inc: { budget: -RENT_PRICE },
			$addToSet: { rentals: ObjectId(movie) }
		}
	}

	if (action === 'return') {
		if (!exists) throw new Error("movie isn't rented")
		command = {
			$inc: { budget: RENT_PRICE },
			$pull: { rentals: ObjectId(movie) }
		}
	}
	return command
}

function checkRentalExistence(profile: string, movie: string) {
	return getDb()
		.collection('profiles')
		.findOne({
			_id: ObjectId(profile),
			rentals: { $in: [ObjectId(movie)] }
		})
}

function validateInputs(profile: string, movie: string) {
	if (!profile || !movie) throw new Error('Profile and/or Movie are missing')
}

function validateAction(action: string) {
	if (action !== 'rent' && action !== 'return')
		throw new Error('Invalid operation')
}
