import express from 'express'
import compression from 'compression'

import { sessionHandler } from './middlewares/session'
import {
  passportMiddleware,
  passportSessionHandler
} from './middlewares/passport'

import { router as pagesRouter } from './routes/pagesRouter'
import { router as productsRouter } from './routes/productRouter'
import { router as cartsRouter } from './routes/cartRouter'
import { router as randomsRouter } from './routes/randomsRouter'
import { router as authRouter } from './routes/authRouter'
import { router as infoRouter } from './routes/infoRouter'
import { router as messagesRouter } from './routes/messagesRouter'

import { hbsConfig } from './config/engine'
import { requestLogger } from './middlewares/requestLogger'
import { get } from './controllers/pagesController'

const app = express()

app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static('public'))
app.use(sessionHandler)
app.use(passportMiddleware)
app.use(passportSessionHandler)

app.engine('hbs', hbsConfig)
app.set('view engine', 'hbs')

app.use('/', pagesRouter)
app.use('/auth', authRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/randoms', randomsRouter)
app.use('/api/info', infoRouter)
app.use('/api/messages', messagesRouter)

app.get('*', requestLogger, get.renderNotFoundPage)

export const createServer = (PORT: number) => {
  return new Promise<any | Error>((resolve, reject) => {
    const server = app.listen(PORT, () => resolve(server))
    server.on('error', (err) => reject(err))
  })
}
