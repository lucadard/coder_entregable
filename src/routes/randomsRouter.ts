import { Router } from 'express'
import { get } from '../controllers/randomsController'

export const router = Router()

router.get('/', get.getRandoms)
