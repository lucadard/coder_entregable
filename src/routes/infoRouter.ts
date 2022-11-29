import { Router } from 'express'

import { get } from '../controllers/infoController'
import { requestLogger } from '../middlewares/requestLogger'

export const router = Router()

router.get('/', requestLogger, get.getInfo)
