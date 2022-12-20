import { Router } from 'express'

import { authentication } from '../middlewares/authentication'

import { get, post, eliminate } from '../controllers/cartController'
import { requestLogger } from '../middlewares/requestLogger'
import { adminAuthorization } from '../middlewares/adminAuthorization'

export const router = Router()

router.get('/', requestLogger, authentication, get.getUserCart)

router.get(
  '/:id/products',
  requestLogger,
  adminAuthorization,
  get.getProductsInCart
)

router.post('/add', requestLogger, authentication, post.addProductToCart)

router.delete(
  '/',
  authentication,
  requestLogger,
  eliminate.deleteAllProductsFromCart
)

router.delete(
  '/product/:id_prod',
  authentication,
  requestLogger,
  eliminate.deleteOneProductFromCart
)
