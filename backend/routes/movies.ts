import { Router } from 'oak'
import * as moviesController from '../controllers/movies.ts'
import { API_URL } from '../config/consts.ts'

const router = new Router()

router.get(`${API_URL}/movies`, moviesController.getMovies)
router.get(`${API_URL}/movie/:id`, moviesController.getMovie)

export default router
