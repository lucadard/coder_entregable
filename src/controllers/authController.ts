import { Request, Response } from 'express'
import passport from 'passport'

export const get = {
  loginSuccess: (req: Request, res: Response) => {
    res.redirect('/')
  },
  loginFail: (req: Request, res: Response) => {
    res.render('login', {
      title: 'Ingresá',
      msg: 'Ocurrio un error'
    })
  },
  registerSuccess: (req: Request, res: Response) => {
    res.redirect('/')
  },
  registerFail: (req: Request, res: Response) => {
    res.render('register', {
      title: 'Registrate',
      msg: 'Ocurrio un error'
    })
  },
  logout: (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      req.logout((err) => res.status(200).redirect('/'))
    } else res.status(204).redirect('/')
  }
}

export const post = {
  login: passport.authenticate('login', {
    successRedirect: '/auth/login/success',
    failureRedirect: '/auth/login/fail'
  }),
  register: passport.authenticate('register', {
    successRedirect: '/auth/register/success',
    failureRedirect: '/auth/register/fail'
  })
}
