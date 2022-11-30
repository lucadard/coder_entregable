import { Router } from 'express'

import { authentication } from '../middlewares/authentication'
import { adminAuthorization } from '../middlewares/adminAuthorization'

import { get } from '../controllers/pagesController'
import { requestLogger } from '../middlewares/requestLogger'

export const router = Router()

router.get(
  '/',
  requestLogger,
  get.renderHomePage
)
router.get('/cart', authentication, requestLogger, get.renderUserCart)

router.get('/auth/login', requestLogger, get.renderLoginPage)
router.get('/auth/register', requestLogger, get.renderRegisterPage)

router.get(
  '/products/add',
  adminAuthorization,
  requestLogger,
  get.renderAddProductPage
)
router.get(
  '/products/update',
  adminAuthorization,
  requestLogger,
  get.renderUpdateProductPage
)
