import { Router } from 'express'

import { authentication } from '../middlewares/authentication'

import { get, post, eliminate } from '../controllers/cartController'
import { requestLogger } from '../middlewares/requestLogger'

export const router = Router()

router.get('/:id/products', requestLogger, get.getProductsInCart)

router.post(
  '/:id_user/products/:id_prod',
  requestLogger,
  authentication,
  post.addProductToCart
)

router.delete(
  '/:user_id',
  authentication,
  requestLogger,
  eliminate.deleteAllProductsFromCart
)

router.delete(
  '/:id_user/products/:id_prod',
  authentication,
  requestLogger,
  eliminate.deleteOneProductFromCart
)
