import { Router } from 'https://deno.land/x/oak@main/mod.ts'
import * as profilesController from '../controllers/profiles.ts'

const router = new Router()

router.get('/profiles', profilesController.getProfiles)
router.post('/profile', profilesController.addProfile)
router.put('/profile/:action', profilesController.rentMovie)

export default router
