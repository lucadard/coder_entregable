import { Router } from 'express'

import { authentication } from '../middlewares/authentication'
import { adminAuthorization } from '../middlewares/adminAuthorization'
import { eliminate, get, post, update } from '../controllers/productController'
import { requestLogger } from '../middlewares/requestLogger'

export const router = Router()

router.get('/', requestLogger, get.getAllProducts)

router.get('/:id', authentication, requestLogger, get.getProductById)

router.post('/', adminAuthorization, requestLogger, post.addProduct)

router.put('/:id', adminAuthorization, requestLogger, update.updateProductById)

router.delete(
  '/:id',
  adminAuthorization,
  requestLogger,
  eliminate.deleteProductById
)
