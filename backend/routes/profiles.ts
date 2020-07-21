import { Router } from 'oak'
import * as profilesController from '../controllers/profiles.ts'
import { API_URL } from '../config/consts.ts'

const router = new Router()

router.get(`${API_URL}/profiles`, profilesController.getProfiles)
router.get(`${API_URL}/profile/:id`, profilesController.getProfile)
router.post(`${API_URL}/profile`, profilesController.addProfile)
router.put(`${API_URL}/profile/:action`, profilesController.rentMovie)

export default router
