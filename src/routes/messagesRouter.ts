import { Router } from 'express'

import { get, post } from '../controllers/messagesController'
import { requestLogger } from '../middlewares/requestLogger'

import { authentication } from '../middlewares/authentication'

export const router = Router()

router.get('/', requestLogger, get.getAllMessages)

router.get('/:id', requestLogger, get.getMessageById)

router.post('/', requestLogger, authentication, post.addMessage)
