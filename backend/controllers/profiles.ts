import { RouterContext } from 'https://deno.land/x/oak@main/mod.ts'

import { getDb } from '../config/db_client.ts'
import Profile from '../models/Profile.ts'

export async function getProfiles(ctx: RouterContext) {
	try {
		const profiles = await getDb().collection<Profile[]>('profiles').find({})
		ctx.response.body = { profiles }
	} catch (error) {
		console.log(error)
	}
}
