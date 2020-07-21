import { Router } from 'https://deno.land/x/oak@main/mod.ts'
import * as moviesController from '../controllers/movies.ts'

const router = new Router()

router.get('/movies', moviesController.getMovies)
router.get('/movie/:id', moviesController.getMovie)

export default router
