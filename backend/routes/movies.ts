import { Router } from 'oak'
import * as moviesController from '../controllers/movies.ts'
import { API_URL } from '../config/consts.ts'

const router = new Router({ prefix: API_URL })

router
	.get(`/movies`, moviesController.getMovies)
	.get(`/movie/:id`, moviesController.getMovie)

export default router
