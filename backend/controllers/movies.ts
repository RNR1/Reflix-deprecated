import { ObjectId } from 'https://deno.land/x/mongo@v0.9.1/mod.ts'
import { RouterContext } from 'https://deno.land/x/oak@main/mod.ts'

import { getDb } from '../config/db_client.ts'
import Movie from '../models/Movie.ts'
import { extractContextBody } from '../utils/helpers.ts'

export async function getMovies(ctx: RouterContext) {
	try {
		const movies = await getDb().collection<Movie[]>('movies').find()
		ctx.response.body = movies
	} catch (error) {
		ctx.response.status = 500
		ctx.response.body = error.message
	}
}

export async function getMovie(ctx: RouterContext) {
	try {
		const { id } = ctx.params
		if (!id) throw new Error('Movie id is missing')
		const _id = ObjectId(id)
		const movie = await getDb().collection<Movie>('movies').findOne({ _id })
		if (!movie) throw new Error('Movie not found')
		ctx.response.body = movie
	} catch (error) {
		ctx.response.status = 400
		ctx.response.body = error.message
	}
}
