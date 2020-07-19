import { Router } from 'https://deno.land/x/oak@main/mod.ts'
import * as profilesController from '../controllers/profiles.ts'

const router = new Router()

router.get('/profiles', profilesController.getProfiles)

export default router
