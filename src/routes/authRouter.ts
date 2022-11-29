import { Router } from 'express'
import { get, post } from '../controllers/authController'

export const router = Router()

router.post('/login', post.login)

router.get('/login/success', get.loginSuccess)

router.get('/login/fail', get.loginFail)

router.post('/register', post.register)

router.get('/register/success', get.registerSuccess)

router.get('/register/fail', get.registerFail)

router.get('/logout', get.logout)
