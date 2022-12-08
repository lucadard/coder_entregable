import session from 'express-session'
import MongoStore from 'connect-mongo'

import config from '../databases/config'

const mongoStore = MongoStore.create({
  mongoUrl: config.mongodb.url,
  ttl: 10 * 60 // 10 min
})

export const sessionHandler = session({
  store: mongoStore,
  secret: 'shhhhhhhh',
  resave: false,
  saveUninitialized: false
})
