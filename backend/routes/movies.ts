import { Router } from 'https://deno.land/x/oak@main/mod.ts'
import * as moviesController from '../controllers/movies.ts'

const router = new Router()

router.get('/movies', moviesController.getMovies)

export default router
