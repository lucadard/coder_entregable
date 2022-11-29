import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { logger } from '../config/logger'
import { cartDAO, userDAO } from '../databases/index'

const localRegisterStrategy = new LocalStrategy(
  {
    passReqToCallback: true
  },
  async (_req, username, password, done) => {
    try {
      const newUser = await userDAO.register({ username, password })
      done(null, newUser)
    } catch (err: any) {
      logger.error(`Error while register. ${err}`)
      done(null, false, err)
    }
  }
)

const localLoginStrategy = new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await userDAO.authenticate({ username, password })
      done(null, user)
    } catch (err: any) {
      logger.error(`Error while login. ${err}`)
      done(null, false, err)
    }
  }
)

passport.use('register', localRegisterStrategy)
passport.use('login', localLoginStrategy)

export const passportMiddleware = passport.initialize()

passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await userDAO.findById(id)
    const cart = await cartDAO.findByUserId(user.id)
    done(null, {
      id: user!.id,
      username: user!.username,
      cartAmount: cart!.products.length,
      admin: user!.admin
    })
  } catch (err) {
    done(err)
  }
})

export const passportSessionHandler = passport.session()
