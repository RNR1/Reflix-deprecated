import { RouterContext } from 'https://deno.land/x/oak@main/mod.ts'

import { getDb } from '../config/db_client.ts'
import Movie from '../models/Movie.ts'

export async function getMovies(ctx: RouterContext) {
	try {
		let movies = await getDb().collection<Movie[]>('movies').find()
		ctx.response.body = movies
	} catch (error) {
		console.log(error)
	}
}
