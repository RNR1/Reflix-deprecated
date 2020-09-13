import { Router } from "oak"
import * as profilesController from "../controllers/profiles.ts"
import { API_URL } from "../config/consts.ts"

const router = new Router({ prefix: API_URL })

router
  .get(`/profiles`, profilesController.getProfiles)
  .get(`/profile/:id`, profilesController.getProfile)
  .post(`/profile`, profilesController.addProfile)
  .put(`/profile/:action`, profilesController.rentMovie)

export default router
